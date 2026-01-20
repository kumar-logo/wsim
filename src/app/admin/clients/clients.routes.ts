import { Routes } from '@angular/router';

export const CLIENTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./client-list/client-list.component').then(m => m.ClientListComponent) },
  { path: 'create', loadComponent: () => import('./client-create/client-create.component').then(m => m.ClientCreateComponent) },
  { path: ':id', loadComponent: () => import('./client-details/client-details.component').then(m => m.ClientDetailsComponent) },
  { path: ':id/edit', loadComponent: () => import('./client-edit/client-edit.component').then(m => m.ClientEditComponent) },
  { path: ':id/portfolio', loadComponent: () => import('./client-portfolio-summary/client-portfolio-summary.component').then(m => m.ClientPortfolioSummaryComponent) }
];
