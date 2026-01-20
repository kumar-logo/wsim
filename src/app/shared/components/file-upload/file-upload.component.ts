import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-file-upload',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div 
      class="border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200"
      [ngClass]="{
        'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500': !isDragOver,
        'border-blue-500 bg-blue-50 dark:bg-blue-900/20': isDragOver
      }"
      (dragover)="onDragOver($event)"
      (dragleave)="onDragLeave($event)"
      (drop)="onDrop($event)">
      
      <input 
        type="file" 
        #fileInput
        [accept]="accept"
        [multiple]="multiple"
        (change)="onFileSelected($event)"
        class="hidden">
      
      <div class="flex flex-col items-center gap-4">
        <div class="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
          <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
        </div>
        
        <div>
          <p class="text-sm text-slate-600 dark:text-slate-400 mb-1">
            <button 
              type="button"
              (click)="fileInput.click()"
              class="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
              Click to upload
            </button>
            or drag and drop
          </p>
          <p class="text-xs text-slate-500 dark:text-slate-500">{{ acceptText }}</p>
          @if (maxSize) {
            <p class="text-xs text-slate-500 dark:text-slate-500">Max file size: {{ formatSize(maxSize) }}</p>
          }
        </div>
      </div>

      @if (selectedFiles.length > 0) {
        <div class="mt-6 border-t border-slate-200 dark:border-slate-700 pt-4">
          <p class="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Selected Files:</p>
          <div class="space-y-2">
            @for (file of selectedFiles; track file.name) {
              <div class="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div class="flex items-center gap-3">
                  <svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                  <div>
                    <p class="text-sm font-medium text-slate-700 dark:text-slate-300">{{ file.name }}</p>
                    <p class="text-xs text-slate-500">{{ formatSize(file.size) }}</p>
                  </div>
                </div>
                <button 
                  type="button"
                  (click)="removeFile(file)"
                  class="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors">
                  <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </button>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class FileUploadComponent {
  @Input() accept = '.xlsx,.xls,.csv';
  @Input() acceptText = 'Excel files (.xlsx, .xls) or CSV';
  @Input() multiple = false;
  @Input() maxSize = 10 * 1024 * 1024;

  @Output() filesSelected = new EventEmitter<File[]>();
  @Output() fileRemoved = new EventEmitter<File>();

  selectedFiles: File[] = [];
  isDragOver = false;

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files) {
      this.handleFiles(Array.from(files));
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(Array.from(input.files));
    }
    input.value = '';
  }

  handleFiles(files: File[]): void {
    const validFiles = files.filter(file => {
      if (this.maxSize && file.size > this.maxSize) {
        return false;
      }
      return true;
    });

    if (this.multiple) {
      this.selectedFiles = [...this.selectedFiles, ...validFiles];
    } else {
      this.selectedFiles = validFiles.slice(0, 1);
    }

    this.filesSelected.emit(this.selectedFiles);
  }

  removeFile(file: File): void {
    this.selectedFiles = this.selectedFiles.filter(f => f !== file);
    this.fileRemoved.emit(file);
    this.filesSelected.emit(this.selectedFiles);
  }

  formatSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}
