import { Routes } from '@angular/router';

export const ROLES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./roles-list/roles-list.component').then(m => m.RolesListComponent) },
  { path: 'create', loadComponent: () => import('./role-create/role-create.component').then(m => m.RoleCreateComponent) },
  { path: ':id/edit', loadComponent: () => import('./role-edit/role-edit.component').then(m => m.RoleEditComponent) }
];
