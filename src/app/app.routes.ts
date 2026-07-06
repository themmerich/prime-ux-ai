import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Datenschutz, Impressum } from './pages/legal';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'impressum', component: Impressum },
  { path: 'datenschutz', component: Datenschutz },
  { path: '**', redirectTo: '' },
];
