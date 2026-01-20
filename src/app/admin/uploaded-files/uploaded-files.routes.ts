import { Routes } from '@angular/router';

export const UPLOADED_FILES_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./uploaded-files-list/uploaded-files-list.component').then(m => m.UploadedFilesListComponent) },
  { path: ':id', loadComponent: () => import('./uploaded-file-details/uploaded-file-details.component').then(m => m.UploadedFileDetailsComponent) },
  { path: ':id/logs', loadComponent: () => import('./uploaded-file-logs/uploaded-file-logs.component').then(m => m.UploadedFileLogsComponent) }
];
