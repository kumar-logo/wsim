import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  { path: '', redirectTo: 'system', pathMatch: 'full' },
  { path: 'system', loadComponent: () => import('./system-settings/system-settings.component').then(m => m.SystemSettingsComponent) },
  { path: 'security', loadComponent: () => import('./security-settings/security-settings.component').then(m => m.SecuritySettingsComponent) },
  { path: 'notifications', loadComponent: () => import('./notification-settings/notification-settings.component').then(m => m.NotificationSettingsComponent) },
  { path: 'audit-logs', loadComponent: () => import('./audit-logs/audit-logs.component').then(m => m.AuditLogsComponent) }
];
