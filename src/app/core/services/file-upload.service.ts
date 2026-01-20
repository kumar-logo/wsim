import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, interval, take, map } from 'rxjs';
import { FileUploadProgress } from '../models/excel-file.model';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {
  private progressSignal = signal<FileUploadProgress | null>(null);
  readonly progress = this.progressSignal.asReadonly();

  upload(file: File): Observable<FileUploadProgress> {
    return interval(200).pipe(
      take(11),
      map(i => {
        const progress: FileUploadProgress = {
          fileName: file.name,
          progress: i * 10,
          status: i < 10 ? 'uploading' : 'complete',
          message: i < 10 ? `Uploading... ${i * 10}%` : 'Upload complete'
        };
        this.progressSignal.set(progress);
        return progress;
      })
    );
  }

  reset(): void {
    this.progressSignal.set(null);
  }
}
