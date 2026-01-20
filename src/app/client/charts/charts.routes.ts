import { Routes } from '@angular/router';

export const CHARTS_ROUTES: Routes = [
  { path: '', redirectTo: 'allocation', pathMatch: 'full' },
  { path: 'allocation', loadComponent: () => import('./allocation-chart/allocation-chart.component').then(m => m.AllocationChartComponent) },
  { path: 'performance', loadComponent: () => import('./performance-chart/performance-chart.component').then(m => m.PerformanceChartComponent) }
];
