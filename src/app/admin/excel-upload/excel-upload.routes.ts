import { Routes } from '@angular/router';

export const EXCEL_UPLOAD_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./excel-upload.component').then(m => m.ExcelUploadComponent) }
];
