import { Routes } from '@angular/router';

export const POSITIONS_ROUTES: Routes = [
  { path: '', redirectTo: 'open', pathMatch: 'full' },
  { path: 'open', loadComponent: () => import('./open-positions/open-positions.component').then(m => m.OpenPositionsComponent) },
  { path: 'closed', loadComponent: () => import('./closed-positions/closed-positions.component').then(m => m.ClosedPositionsComponent) }
];
