import { PLATFORM_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { describe, expect, it } from 'vitest';
import { Motion } from './motion';

describe('Motion', () => {
  it('liefert auf dem Server kein GSAP (SSR-sicher)', async () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    const motion = TestBed.inject(Motion);
    await expect(motion.load()).resolves.toBeNull();
  });

  it('meldet auf dem Server keine reduzierte Bewegung', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }],
    });
    const motion = TestBed.inject(Motion);
    expect(motion.reduced).toBe(false);
  });
});
