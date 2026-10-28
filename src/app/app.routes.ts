import { Routes } from '@angular/router';
import { AuthPage } from './auth-page';
import { LandingPage } from './app';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: LandingPage },
  { path: 'login', component: AuthPage, data: { mode: 'login' } },
  { path: 'register', component: AuthPage, data: { mode: 'register' } },
  { path: '**', redirectTo: 'home' },
];
