import { Routes } from '@angular/router';

export const CHARTS_ROUTES: Routes = [
  { path: '', redirectTo: 'asset-allocation', pathMatch: 'full' },
  { path: 'asset-allocation', loadComponent: () => import('./asset-allocation-chart/asset-allocation-chart.component').then(m => m.AssetAllocationChartComponent) },
  { path: 'performance', loadComponent: () => import('./performance-chart/performance-chart.component').then(m => m.PerformanceChartComponent) }
];
