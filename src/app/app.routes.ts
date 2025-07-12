import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },          // Show Home page at /
  { path: 'profile', component: ProfileViewComponent },  // Portfolio view at /profile
  { path: '**', redirectTo: '' }                   // Fallback
];
