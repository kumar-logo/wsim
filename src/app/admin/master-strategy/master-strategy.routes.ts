import { Routes } from '@angular/router';

export const MASTER_STRATEGY_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./master-strategy-list/master-strategy-list.component').then(m => m.MasterStrategyListComponent) },
  { path: 'create', loadComponent: () => import('./master-strategy-create/master-strategy-create.component').then(m => m.MasterStrategyCreateComponent) },
  { path: ':id', loadComponent: () => import('./master-strategy-details/master-strategy-details.component').then(m => m.MasterStrategyDetailsComponent) },
  { path: ':id/edit', loadComponent: () => import('./master-strategy-edit/master-strategy-edit.component').then(m => m.MasterStrategyEditComponent) }
];
