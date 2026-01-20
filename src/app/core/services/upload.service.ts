import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { ExcelFile, FileStatus } from '../models/excel-file.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private mockFiles: ExcelFile[] = [
    {
      id: '1', fileName: 'positions_q4_2023.xlsx', originalName: 'positions_q4_2023.xlsx',
      fileSize: 245760, fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      uploadedBy: '1', uploadedByName: 'John Administrator', uploadedAt: new Date('2023-12-15'),
      processedAt: new Date('2023-12-15'), status: FileStatus.PROCESSED, sheets: [],
      errorCount: 0, warningCount: 2, recordsProcessed: 148, recordsTotal: 150
    },
    {
      id: '2', fileName: 'clients_update.xlsx', originalName: 'clients_update.xlsx',
      fileSize: 128000, fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      uploadedBy: '2', uploadedByName: 'Sarah Manager', uploadedAt: new Date('2023-12-20'),
      processedAt: new Date('2023-12-20'), status: FileStatus.PROCESSED, sheets: [],
      errorCount: 0, warningCount: 0, recordsProcessed: 45, recordsTotal: 45
    },
    {
      id: '3', fileName: 'transactions_jan2024.xlsx', originalName: 'transactions_jan2024.xlsx',
      fileSize: 512000, fileType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      uploadedBy: '1', uploadedByName: 'John Administrator', uploadedAt: new Date('2024-01-05'),
      status: FileStatus.VALIDATING, sheets: [],
      errorCount: 0, warningCount: 0, recordsProcessed: 0, recordsTotal: 320
    }
  ];

  private filesSignal = signal<ExcelFile[]>(this.mockFiles);
  readonly files = this.filesSignal.asReadonly();

  getFiles(): Observable<ExcelFile[]> {
    return of(this.mockFiles).pipe(delay(500));
  }

  getFile(id: string): Observable<ExcelFile | undefined> {
    return of(this.mockFiles.find(f => f.id === id)).pipe(delay(300));
  }

  uploadFile(file: File): Observable<ExcelFile> {
    const newFile: ExcelFile = {
      id: String(this.mockFiles.length + 1),
      fileName: file.name, originalName: file.name, fileSize: file.size,
      fileType: file.type, uploadedBy: '1', uploadedByName: 'Current User',
      uploadedAt: new Date(), status: FileStatus.UPLOADED, sheets: [],
      errorCount: 0, warningCount: 0, recordsProcessed: 0, recordsTotal: 0
    };
    this.mockFiles.push(newFile);
    this.filesSignal.set([...this.mockFiles]);
    return of(newFile).pipe(delay(2000));
  }

  processFile(id: string): Observable<ExcelFile> {
    const file = this.mockFiles.find(f => f.id === id);
    if (file) {
      file.status = FileStatus.PROCESSING;
      this.filesSignal.set([...this.mockFiles]);
    }
    return of(file!).pipe(delay(3000));
  }

  deleteFile(id: string): Observable<boolean> {
    this.mockFiles = this.mockFiles.filter(f => f.id !== id);
    this.filesSignal.set([...this.mockFiles]);
    return of(true).pipe(delay(500));
  }
}
