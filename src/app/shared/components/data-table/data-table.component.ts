import { Component, Input, Output, EventEmitter, ContentChild, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  width?: string;
  align?: 'left' | 'center' | 'right';
  template?: TemplateRef<any>;
}

export interface SortEvent {
  column: string;
  direction: 'asc' | 'desc';
}

export interface PageEvent {
  page: number;
  pageSize: number;
}

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card overflow-hidden">
      @if (showSearch || showPagination) {
        <div class="p-4 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
          @if (showSearch) {
            <div class="relative w-full sm:w-64">
              <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <input 
                type="text" 
                [(ngModel)]="searchTerm"
                (ngModelChange)="onSearch($event)"
                placeholder="Search..."
                class="input pl-10">
            </div>
          }
          <div class="flex items-center gap-2">
            <ng-content select="[table-actions]"></ng-content>
          </div>
        </div>
      }
      
      <div class="overflow-x-auto">
        <table class="table">
          <thead>
            <tr>
              @if (selectable) {
                <th class="w-12">
                  <input 
                    type="checkbox" 
                    [checked]="allSelected"
                    (change)="toggleSelectAll()"
                    class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                </th>
              }
              @for (column of columns; track column.key) {
                <th 
                  [style.width]="column.width"
                  [class.cursor-pointer]="column.sortable"
                  [class.select-none]="column.sortable"
                  (click)="column.sortable && onSort(column.key)"
                  [ngClass]="{'text-left': column.align === 'left', 'text-center': column.align === 'center', 'text-right': column.align === 'right'}">
                  <div class="flex items-center gap-2" [ngClass]="{'justify-end': column.align === 'right', 'justify-center': column.align === 'center'}">
                    {{ column.label }}
                    @if (column.sortable) {
                      <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                      </svg>
                    }
                  </div>
                </th>
              }
              @if (showActions) {
                <th class="w-24 text-right">Actions</th>
              }
            </tr>
          </thead>
          <tbody>
            @for (row of paginatedData; track trackByFn(row)) {
              <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                @if (selectable) {
                  <td>
                    <input 
                      type="checkbox" 
                      [checked]="isSelected(row)"
                      (change)="toggleSelect(row)"
                      class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  </td>
                }
                @for (column of columns; track column.key) {
                  <td [ngClass]="{'text-right': column.align === 'right', 'text-center': column.align === 'center'}">
                    @if (column.template) {
                      <ng-container *ngTemplateOutlet="column.template; context: { $implicit: row, row: row, value: row[column.key] }"></ng-container>
                    } @else {
                      {{ row[column.key] }}
                    }
                  </td>
                }
                @if (showActions) {
                  <td class="text-right">
                    <ng-content select="[row-actions]"></ng-content>
                  </td>
                }
              </tr>
            } @empty {
              <tr>
                <td [attr.colspan]="columns.length + (selectable ? 1 : 0) + (showActions ? 1 : 0)" class="text-center py-12">
                  <div class="text-slate-500">No data available</div>
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>

      @if (showPagination && totalItems > pageSize) {
        <div class="p-4 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div class="text-sm text-slate-500">
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} entries
          </div>
          <div class="flex items-center gap-2">
            <button 
              class="btn btn-sm btn-secondary"
              [disabled]="currentPage === 1"
              (click)="goToPage(currentPage - 1)">
              Previous
            </button>
            @for (page of visiblePages; track page) {
              <button 
                class="btn btn-sm"
                [ngClass]="page === currentPage ? 'btn-primary' : 'btn-secondary'"
                (click)="goToPage(page)">
                {{ page }}
              </button>
            }
            <button 
              class="btn btn-sm btn-secondary"
              [disabled]="currentPage === totalPages"
              (click)="goToPage(currentPage + 1)">
              Next
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class DataTableComponent {
  @Input() data: any[] = [];
  @Input() columns: TableColumn[] = [];
  @Input() pageSize = 10;
  @Input() showSearch = true;
  @Input() showPagination = true;
  @Input() showActions = false;
  @Input() selectable = false;
  @Input() trackBy: string = 'id';

  @Output() sort = new EventEmitter<SortEvent>();
  @Output() page = new EventEmitter<PageEvent>();
  @Output() search = new EventEmitter<string>();
  @Output() selectionChange = new EventEmitter<any[]>();

  searchTerm = '';
  currentPage = 1;
  selectedItems: any[] = [];
  sortColumn = '';
  sortDirection: 'asc' | 'desc' = 'asc';

  get filteredData(): any[] {
    if (!this.searchTerm) return this.data;
    const term = this.searchTerm.toLowerCase();
    return this.data.filter(row => 
      Object.values(row).some(val => 
        String(val).toLowerCase().includes(term)
      )
    );
  }

  get totalItems(): number {
    return this.filteredData.length;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }

  get startIndex(): number {
    return (this.currentPage - 1) * this.pageSize;
  }

  get endIndex(): number {
    return Math.min(this.startIndex + this.pageSize, this.totalItems);
  }

  get paginatedData(): any[] {
    return this.filteredData.slice(this.startIndex, this.endIndex);
  }

  get visiblePages(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, start + 4);
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  }

  get allSelected(): boolean {
    return this.paginatedData.length > 0 && this.paginatedData.every(row => this.isSelected(row));
  }

  trackByFn(row: any): any {
    return row[this.trackBy];
  }

  onSearch(term: string): void {
    this.searchTerm = term;
    this.currentPage = 1;
    this.search.emit(term);
  }

  onSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.sort.emit({ column: this.sortColumn, direction: this.sortDirection });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.page.emit({ page: this.currentPage, pageSize: this.pageSize });
    }
  }

  isSelected(row: any): boolean {
    return this.selectedItems.some(item => item[this.trackBy] === row[this.trackBy]);
  }

  toggleSelect(row: any): void {
    if (this.isSelected(row)) {
      this.selectedItems = this.selectedItems.filter(item => item[this.trackBy] !== row[this.trackBy]);
    } else {
      this.selectedItems = [...this.selectedItems, row];
    }
    this.selectionChange.emit(this.selectedItems);
  }

  toggleSelectAll(): void {
    if (this.allSelected) {
      this.selectedItems = [];
    } else {
      this.selectedItems = [...this.paginatedData];
    }
    this.selectionChange.emit(this.selectedItems);
  }
}
