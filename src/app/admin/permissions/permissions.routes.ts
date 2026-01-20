import { Routes } from '@angular/router';

export const PERMISSSIONS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./permissions-list/permissions-list.component').then(m => m.PermissionsListComponent) },
  { path: 'create', loadComponent: () => import('./permissions-create/permissions-create.component').then(m => m.PermissionsCreateComponent) },
  { path: ':id/edit', loadComponent: () => import('./permissions-edit/permissions-edit.component').then(m => m.PermissionsEditComponent) }
];
