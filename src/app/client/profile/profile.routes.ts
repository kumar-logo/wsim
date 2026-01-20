import { Routes } from '@angular/router';

export const PROFILE_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./profile-view/profile-view.component').then(m => m.ProfileViewComponent) },
  { path: 'edit', loadComponent: () => import('./edit-profile/edit-profile.component').then(m => m.EditProfileComponent) },
  { path: 'change-password', loadComponent: () => import('./change-password/change-password.component').then(m => m.ChangePasswordComponent) }
];
