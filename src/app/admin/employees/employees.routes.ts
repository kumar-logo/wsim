import { Routes } from '@angular/router';

export const EMPLOYEES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./employee-list/employee-list.component').then(m => m.EmployeeListComponent) },
  { path: 'create', loadComponent: () => import('./employee-create/employee-create.component').then(m => m.EmployeeCreateComponent) },
  { path: ':id', loadComponent: () => import('./employee-details/employee-details.component').then(m => m.EmployeeDetailsComponent) },
  { path: ':id/edit', loadComponent: () => import('./employee-edit/employee-edit.component').then(m => m.EmployeeEditComponent) }
];
