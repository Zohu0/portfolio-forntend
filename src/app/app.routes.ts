import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';
import { CreateProfileComponent } from './pages/create-profile/create-profile.component';
import { LoginComponent } from './components/login/login.component';


export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'create-portfolio', component: CreateProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile/:id', component: ProfileViewComponent },
  { path: '**', redirectTo: '' }
];
