import { Routes } from '@angular/router';
import { Home } from './pages/home';
import { Datenschutz, Impressum } from './pages/legal';
import { BlogList } from './blog/blog-list';
import { BlogPost } from './blog/blog-post';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'blog', component: BlogList },
  { path: 'blog/:slug', component: BlogPost },
  { path: 'impressum', component: Impressum },
  { path: 'datenschutz', component: Datenschutz },
  { path: '**', redirectTo: '' },
];
