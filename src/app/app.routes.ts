import { Routes } from '@angular/router';
import { LandingPage } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPage },
  { path: '**', redirectTo: 'home' },
];
