import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExcelSheet } from '../../../core/models/excel-file.model';

@Component({
  selector: 'app-excel-preview-table',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (sheet) {
      <div class="card overflow-hidden">
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h3 class="font-semibold text-slate-900 dark:text-white">{{ sheet.name }}</h3>
            <p class="text-sm text-slate-500">{{ sheet.rowCount }} rows, {{ sheet.columnCount }} columns</p>
          </div>
          @if (showRowCount) {
            <span class="badge badge-primary">Preview: First {{ maxRows }} rows</span>
          }
        </div>
        
        <div class="overflow-x-auto max-h-96">
          <table class="table">
            <thead class="sticky top-0 bg-slate-50 dark:bg-slate-800">
              <tr>
                <th class="w-12 text-center">#</th>
                @for (header of sheet.headers; track header; let i = $index) {
                  <th>
                    <div class="flex items-center gap-2">
                      <span class="text-xs text-slate-400 font-mono">{{ getColumnLetter(i) }}</span>
                      {{ header }}
                    </div>
                  </th>
                }
              </tr>
            </thead>
            <tbody>
              @for (row of displayData; track $index; let rowIndex = $index) {
                <tr>
                  <td class="text-center text-slate-400 text-sm">{{ rowIndex + 1 }}</td>
                  @for (cell of row; track $index) {
                    <td class="max-w-xs truncate" [title]="cell">{{ cell }}</td>
                  }
                </tr>
              }
            </tbody>
          </table>
        </div>
      </div>
    }
  `
})
export class ExcelPreviewTableComponent {
  @Input() sheet: ExcelSheet | null = null;
  @Input() maxRows = 10;
  @Input() showRowCount = true;

  get displayData(): any[][] {
    if (!this.sheet?.previewData) return [];
    return this.sheet.previewData.slice(0, this.maxRows);
  }

  getColumnLetter(index: number): string {
    let letter = '';
    while (index >= 0) {
      letter = String.fromCharCode((index % 26) + 65) + letter;
      index = Math.floor(index / 26) - 1;
    }
    return letter;
  }
}
