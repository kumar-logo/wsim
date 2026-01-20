import { Routes } from '@angular/router';

export const STRATEGY_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./strategy-list/strategy-list.component').then(m => m.StrategyListComponent) },
  { path: 'create', loadComponent: () => import('./strategy-create/strategy-create.component').then(m => m.StrategyCreateComponent) },
  { path: ':id', loadComponent: () => import('./strategy-details/strategy-details.component').then(m => m.StrategyDetailsComponent) },
  { path: ':id/edit', loadComponent: () => import('./strategy-edit/strategy-edit.component').then(m => m.StrategyEditComponent) }
];
