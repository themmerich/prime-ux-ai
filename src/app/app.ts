import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './sections/header';
import { Footer } from './sections/footer';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterOutlet, Header, Footer],
  template: `
    <px-header />
    <main>
      <router-outlet />
    </main>
    <px-footer />
  `,
})
export class App {}
