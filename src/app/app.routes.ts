import { Routes } from '@angular/router';
import { Home } from './pages/home';

// Nur die Startseite lädt eager; Blog (inkl. marked + Markdown) und Rechtsseiten
// kommen als eigene Chunks, damit das Initial-Bundle klein bleibt.
export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', loadComponent: () => import('./blog/blog-list').then((m) => m.BlogList) },
  { path: 'blog/:slug', loadComponent: () => import('./blog/blog-post').then((m) => m.BlogPost) },
  { path: 'impressum', loadComponent: () => import('./pages/legal').then((m) => m.Impressum) },
  { path: 'datenschutz', loadComponent: () => import('./pages/legal').then((m) => m.Datenschutz) },
  { path: '**', redirectTo: '' },
];
