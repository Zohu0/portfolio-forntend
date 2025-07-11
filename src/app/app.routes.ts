// app.routes.ts
import { Routes } from '@angular/router';
import { AppComponent } from './app/app.component';
import { ProfileViewComponent } from './profile-view/profile-view.component';

export const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      { path: '', component: ProfileViewComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
