import { Routes } from '@angular/router';
import { adminGuard } from './core/guards/admin.guard';
import { clientGuard } from './core/guards/client.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./welcome/welcome.component').then(m => m.WelcomeComponent) 
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'admin',
    loadComponent: () => import('./layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./admin/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'clients',
        loadChildren: () => import('./admin/clients/clients.routes').then(m => m.CLIENTS_ROUTES)
      },
      {
        path: 'employees',
        loadChildren: () => import('./admin/employees/employees.routes').then(m => m.EMPLOYEES_ROUTES)
      },
      {
        path: 'roles',
        loadChildren: () => import('./admin/roles/roles.routes').then(m => m.ROLES_ROUTES)
      },
      {
        path: 'permissions',
        loadChildren: () => import('./admin/permissions/permissions.routes').then(m => m.PERMISSSIONS_ROUTES)
      },
      {
        path: 'strategy',
        loadChildren: () => import('./admin/strategy/strategy.routes').then(m => m.STRATEGY_ROUTES)
      },
      {
        path: 'master-strategy',
        loadChildren: () => import('./admin/master-strategy/master-strategy.routes').then(m => m.MASTER_STRATEGY_ROUTES)
      },
      {
        path: 'excel-upload',
        loadChildren: () => import('./admin/excel-upload/excel-upload.routes').then(m => m.EXCEL_UPLOAD_ROUTES)
      },
      {
        path: 'uploaded-files',
        loadChildren: () => import('./admin/uploaded-files/uploaded-files.routes').then(m => m.UPLOADED_FILES_ROUTES)
      },
      {
        path: 'positions',
        loadChildren: () => import('./admin/positions/positions.routes').then(m => m.POSITIONS_ROUTES)
      },
      {
        path: 'reports',
        loadChildren: () => import('./admin/reports/reports.routes').then(m => m.REPORTS_ROUTES)
      },
      {
        path: 'charts',
        loadChildren: () => import('./admin/charts/charts.routes').then(m => m.CHARTS_ROUTES)
      },
      {
        path: 'settings',
        loadChildren: () => import('./admin/settings/settings.routes').then(m => m.SETTINGS_ROUTES)
      }
    ]
  },
  {
    path: 'client',
    loadComponent: () => import('./layout/client-layout/client-layout.component').then(m => m.ClientLayoutComponent),
    canActivate: [clientGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: () => import('./client/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
      },
      {
        path: 'portfolio',
        loadChildren: () => import('./client/portfolio/portfolio.routes').then(m => m.PORTFOLIO_ROUTES)
      },
      {
        path: 'positions',
        loadChildren: () => import('./client/positions/positions.routes').then(m => m.POSITIONS_ROUTES)
      },
      {
        path: 'reports',
        loadChildren: () => import('./client/reports/reports.routes').then(m => m.REPORTS_ROUTES)
      },
      {
        path: 'charts',
        loadChildren: () => import('./client/charts/charts.routes').then(m => m.CHARTS_ROUTES)
      },
      {
        path: 'profile',
        loadChildren: () => import('./client/profile/profile.routes').then(m => m.PROFILE_ROUTES)
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'auth/login'
  }
];
