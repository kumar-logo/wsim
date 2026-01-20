import { Routes } from '@angular/router';

export const REPORTS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./performance-report/performance-report.component').then(m => m.PerformanceReportComponent) }
];
