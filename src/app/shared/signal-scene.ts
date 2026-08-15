import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  PLATFORM_ID,
  viewChild,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ThemeStore } from '../core/theme';
import { Motion } from '../core/motion';

type ThreeModule = typeof import('three');

/** Fester Zeitpunkt für das statische Frame bei reduzierter Bewegung. */
const STATIC_FRAME_TIME = 2.4;

/**
 * Das „Signalfeld" — ein flaches, wogendes Partikelfeld, dessen Farben vom
 * Sky-Akzent ins Aurora-Violett laufen. Es ist das eine 3D-Motiv der Seite
 * und wird im Hero (Variante 'hero') und im Kontakt-Ausklang (Variante
 * 'panel') wiederverwendet.
 *
 * Verhalten:
 * - Lazy: Three.js kommt per dynamic import, erst im Browser, erst nach dem
 *   ersten Render — SSR/Prerendering sieht nur ein leeres Canvas.
 * - Dezent: pointer-events: none, aria-hidden, reagiert nur subtil auf die
 *   Mausposition (weiche Welle unterm Cursor).
 * - Sparsam: devicePixelRatio ≤ 2, rAF pausiert außerhalb des Viewports und
 *   bei verstecktem Tab, alles wird bei Destroy disposed.
 * - `prefers-reduced-motion`: ein einziges statisches Frame, keine Loop.
 * - Theme-reaktiv: Farb- und Deckkraft-Uniforms folgen Dark/Light live.
 */
@Component({
  selector: 'px-signal-scene',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'pointer-events-none absolute inset-0 block', 'aria-hidden': 'true' },
  template: `<canvas #canvas class="block h-full w-full"></canvas>`,
})
export class SignalScene {
  /** 'hero': dichtes Feld, präsenter · 'panel': sparsamer, leiser. */
  readonly variant = input<'hero' | 'panel'>('hero');

  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private readonly themeStore = inject(ThemeStore);
  private readonly motion = inject(Motion);
  private readonly destroyRef = inject(DestroyRef);

  private renderer?: import('three').WebGLRenderer;
  private scene?: import('three').Scene;
  private camera?: import('three').PerspectiveCamera;
  private material?: import('three').ShaderMaterial;
  private geometry?: import('three').BufferGeometry;
  private three?: ThreeModule;

  private rafId: number | null = null;
  private startTime = 0;
  private inView = true;
  private destroyed = false;
  /** Zielposition des Zeigers in Weltkoordinaten (x/z) — weit weg = kein Einfluss. */
  private pointerTarget: [number, number] = [1000, 1000];
  private pointerCurrent: [number, number] = [1000, 1000];

  constructor() {
    // Theme-Wechsel → Uniforms nachziehen; im statischen Modus ein Frame rendern.
    effect(() => {
      const dark = this.themeStore.theme() === 'dark';
      if (this.material) {
        this.applyTheme(dark);
        if (this.rafId === null) {
          this.renderFrame(STATIC_FRAME_TIME);
        }
      }
    });

    afterNextRender(() => void this.init());
    this.destroyRef.onDestroy(() => this.dispose());
  }

  private async init(): Promise<void> {
    if (!this.isBrowser) {
      return;
    }
    const three = await import('three');
    const canvas = this.canvasRef().nativeElement;
    if (this.destroyed || !canvas.isConnected) {
      return;
    }
    this.three = three;

    let renderer: import('three').WebGLRenderer;
    try {
      renderer = new three.WebGLRenderer({ canvas, alpha: true, antialias: false });
    } catch {
      return; // Kein WebGL — die Seite funktioniert vollständig ohne die Szene.
    }
    this.renderer = renderer;
    renderer.setClearColor(0x000000, 0);

    this.scene = new three.Scene();
    this.camera = new three.PerspectiveCamera(55, 1, 0.1, 60);
    this.camera.position.set(0, 2.4, 7.5);
    this.camera.lookAt(0, 0.2, -2);

    this.buildField(three);
    this.applyTheme(this.themeStore.theme() === 'dark');
    this.resize();

    const host = canvas.parentElement ?? canvas;
    const resizeObserver = new ResizeObserver(() => {
      this.resize();
      if (this.rafId === null) {
        this.renderFrame(STATIC_FRAME_TIME);
      }
    });
    resizeObserver.observe(host);
    this.destroyRef.onDestroy(() => resizeObserver.disconnect());

    if (this.motion.reduced) {
      // Reduzierte Bewegung: ein ruhiges, eingefrorenes Feld — keine Loop,
      // keine Zeigerreaktion.
      this.renderFrame(STATIC_FRAME_TIME);
      return;
    }

    // Sichtbarkeit steuert die rAF-Loop: außerhalb des Viewports oder bei
    // verstecktem Tab wird nicht gerendert.
    const io = new IntersectionObserver(
      (entries) => {
        this.inView = entries.some((e) => e.isIntersecting);
        this.syncLoop();
      },
      { rootMargin: '10% 0px' },
    );
    io.observe(host);
    const onVisibility = () => this.syncLoop();
    document.addEventListener('visibilitychange', onVisibility);
    const onPointerMove = (event: PointerEvent) => this.trackPointer(event);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    this.destroyRef.onDestroy(() => {
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pointermove', onPointerMove);
    });

    this.startTime = performance.now();
    this.syncLoop();
  }

  /** Partikelraster in der xz-Ebene mit Zufalls-Seed und Farbmix-Attribut. */
  private buildField(three: ThreeModule): void {
    const dense = this.variant() === 'hero';
    const narrow = window.innerWidth < 768;
    const cols = dense ? (narrow ? 90 : 150) : narrow ? 70 : 110;
    const rows = dense ? (narrow ? 48 : 72) : narrow ? 28 : 40;
    const halfW = 15;
    const zMin = -9;
    const zMax = 3.5;

    const count = cols * rows;
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const mixes = new Float32Array(count);
    let i = 0;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = -halfW + (c / (cols - 1)) * halfW * 2;
        const z = zMin + (r / (rows - 1)) * (zMax - zMin);
        positions[i * 3] = x;
        positions[i * 3 + 1] = 0;
        positions[i * 3 + 2] = z;
        seeds[i] = Math.random();
        mixes[i] = (x + halfW) / (halfW * 2);
        i++;
      }
    }

    this.geometry = new three.BufferGeometry();
    this.geometry.setAttribute('position', new three.BufferAttribute(positions, 3));
    this.geometry.setAttribute('aSeed', new three.BufferAttribute(seeds, 1));
    this.geometry.setAttribute('aMix', new three.BufferAttribute(mixes, 1));

    this.material = new three.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uPointer: { value: new three.Vector2(1000, 1000) },
        uAmp: { value: this.variant() === 'hero' ? 1 : 0.65 },
        uSize: { value: this.variant() === 'hero' ? 2.4 : 2.0 },
        uDpr: { value: 1 },
        uOpacity: { value: 0.5 },
        uColorA: { value: new three.Color('#38bdf8') },
        uColorB: { value: new three.Color('#a78bfa') },
      },
      vertexShader: `
        uniform float uTime;
        uniform vec2 uPointer;
        uniform float uAmp;
        uniform float uSize;
        uniform float uDpr;
        attribute float aSeed;
        attribute float aMix;
        varying float vMix;
        varying float vGlow;

        void main() {
          vec3 p = position;
          float t = uTime;
          float wave =
            sin(p.x * 0.45 + t * 0.55) * 0.38 +
            sin(p.z * 0.85 - t * 0.4) * 0.22 +
            sin((p.x + p.z) * 0.22 + t * 0.75 + aSeed * 6.2831) * 0.12;
          p.y += wave * uAmp;

          float d = distance(p.xz, uPointer);
          float influence = smoothstep(3.2, 0.0, d);
          p.y += influence * 0.55 * uAmp;

          vGlow = influence;
          vMix = aMix;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = (uSize * (0.75 + 0.5 * aSeed) + vGlow * 2.0) * uDpr * (10.0 / -mv.z);
        }
      `,
      fragmentShader: `
        precision mediump float;
        uniform vec3 uColorA;
        uniform vec3 uColorB;
        uniform float uOpacity;
        varying float vMix;
        varying float vGlow;

        void main() {
          float dist = length(gl_PointCoord - 0.5);
          float disc = smoothstep(0.5, 0.15, dist);
          if (disc < 0.01) discard;
          vec3 color = mix(uColorA, uColorB, vMix);
          float alpha = disc * uOpacity * (0.6 + 0.8 * vGlow);
          gl_FragColor = vec4(color, min(alpha, 1.0));
        }
      `,
    });

    this.scene?.add(new three.Points(this.geometry, this.material));
  }

  /** Farbwelt „Signal" pro Theme — Light braucht dunklere, deckendere Punkte. */
  private applyTheme(dark: boolean): void {
    const material = this.material;
    const three = this.three;
    if (!material || !three) {
      return;
    }
    const hero = this.variant() === 'hero';
    if (dark) {
      (material.uniforms['uColorA'].value as import('three').Color).set('#38bdf8');
      (material.uniforms['uColorB'].value as import('three').Color).set('#a78bfa');
      material.uniforms['uOpacity'].value = hero ? 0.55 : 0.4;
    } else {
      (material.uniforms['uColorA'].value as import('three').Color).set('#0369a1');
      (material.uniforms['uColorB'].value as import('three').Color).set('#7c3aed');
      material.uniforms['uOpacity'].value = hero ? 0.5 : 0.35;
    }
  }

  // Scratch-Vektoren für trackPointer — einmal angelegt statt pro Event.
  private rayVec?: import('three').Vector3;
  private hitVec?: import('three').Vector3;

  /** Maus → Weltkoordinate auf der Feld-Ebene (y = 0), analytisch per Strahl. */
  private trackPointer(event: PointerEvent): void {
    // Pausierte Loop (außerhalb des Viewports, Tab versteckt): das Ergebnis
    // würde nie konsumiert — Layout-Read und Rechnung sparen.
    if (this.rafId === null) {
      return;
    }
    const camera = this.camera;
    const three = this.three;
    const canvas = this.canvasRef().nativeElement;
    if (!camera || !three) {
      return;
    }
    const rect = canvas.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) {
      return;
    }
    const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const ny = -(((event.clientY - rect.top) / rect.height) * 2 - 1);
    this.rayVec ??= new three.Vector3();
    this.hitVec ??= new three.Vector3();
    const dir = this.rayVec.set(nx, ny, 0.5).unproject(camera).sub(camera.position).normalize();
    if (dir.y >= -0.001) {
      return; // Strahl trifft die Ebene nicht — Zeigereinfluss auslaufen lassen.
    }
    const dist = -camera.position.y / dir.y;
    const hit = this.hitVec.copy(camera.position).addScaledVector(dir, dist);
    this.pointerTarget = [hit.x, hit.z];
  }

  private resize(): void {
    const renderer = this.renderer;
    const camera = this.camera;
    const canvas = this.canvasRef().nativeElement;
    const host = canvas.parentElement ?? canvas;
    if (!renderer || !camera) {
      return;
    }
    const width = host.clientWidth;
    const height = host.clientHeight;
    if (width === 0 || height === 0) {
      return;
    }
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    if (this.material) {
      this.material.uniforms['uDpr'].value = dpr;
    }
  }

  /** Startet/stoppt die rAF-Loop abhängig von Sichtbarkeit und Tab-Zustand. */
  private syncLoop(): void {
    const shouldRun =
      !this.destroyed && this.inView && !document.hidden && !this.motion.reduced;
    if (shouldRun && this.rafId === null) {
      const tick = () => {
        this.rafId = requestAnimationFrame(tick);
        // Zeiger weich nachziehen — die Welle folgt, sie springt nicht.
        this.pointerCurrent[0] += (this.pointerTarget[0] - this.pointerCurrent[0]) * 0.06;
        this.pointerCurrent[1] += (this.pointerTarget[1] - this.pointerCurrent[1]) * 0.06;
        this.renderFrame((performance.now() - this.startTime) / 1000);
      };
      tick();
    } else if (!shouldRun && this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  private renderFrame(time: number): void {
    const { renderer, scene, camera, material } = this;
    if (!renderer || !scene || !camera || !material) {
      return;
    }
    material.uniforms['uTime'].value = time;
    (material.uniforms['uPointer'].value as import('three').Vector2).set(
      this.pointerCurrent[0],
      this.pointerCurrent[1],
    );
    renderer.render(scene, camera);
  }

  private dispose(): void {
    this.destroyed = true;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
    this.geometry?.dispose();
    this.material?.dispose();
    this.renderer?.dispose();
  }
}
