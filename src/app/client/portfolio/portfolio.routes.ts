import { Routes } from '@angular/router';

export const PORTFOLIO_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./portfolio-summary/portfolio-summary.component').then(m => m.PortfolioSummaryComponent) }
];
