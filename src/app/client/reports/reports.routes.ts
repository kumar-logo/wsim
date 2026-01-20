import { Routes } from '@angular/router';

export const REPORTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./portfolio-report/portfolio-report.component').then(m => m.PortfolioReportComponent) }
];
