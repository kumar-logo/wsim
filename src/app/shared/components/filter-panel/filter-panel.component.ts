import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface FilterConfig {
  key: string;
  label: string;
  type: 'text' | 'select' | 'date' | 'dateRange' | 'number' | 'checkbox';
  options?: { label: string; value: any }[];
  placeholder?: string;
}

@Component({
  selector: 'app-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="card p-4">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-slate-900 dark:text-white">Filters</h3>
        <button 
          type="button"
          (click)="clearAll()"
          class="text-xs text-blue-600 dark:text-blue-400 hover:underline">
          Clear all
        </button>
      </div>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        @for (filter of filters; track filter.key) {
          <div>
            <label class="label">{{ filter.label }}</label>
            @switch (filter.type) {
              @case ('text') {
                <input 
                  type="text"
                  [(ngModel)]="filterValues[filter.key]"
                  (ngModelChange)="onFilterChange()"
                  [placeholder]="filter.placeholder || ''"
                  class="input">
              }
              @case ('select') {
                <select 
                  [(ngModel)]="filterValues[filter.key]"
                  (ngModelChange)="onFilterChange()"
                  class="select">
                  <option value="">All</option>
                  @for (option of filter.options; track option.value) {
                    <option [value]="option.value">{{ option.label }}</option>
                  }
                </select>
              }
              @case ('date') {
                <input 
                  type="date"
                  [(ngModel)]="filterValues[filter.key]"
                  (ngModelChange)="onFilterChange()"
                  class="input">
              }
              @case ('number') {
                <input 
                  type="number"
                  [(ngModel)]="filterValues[filter.key]"
                  (ngModelChange)="onFilterChange()"
                  [placeholder]="filter.placeholder || ''"
                  class="input">
              }
              @case ('checkbox') {
                <div class="flex items-center gap-2 mt-2">
                  <input 
                    type="checkbox"
                    [(ngModel)]="filterValues[filter.key]"
                    (ngModelChange)="onFilterChange()"
                    class="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500">
                  <span class="text-sm text-slate-600 dark:text-slate-400">{{ filter.placeholder || 'Yes' }}</span>
                </div>
              }
            }
          </div>
        }
      </div>
    </div>
  `
})
export class FilterPanelComponent {
  @Input() filters: FilterConfig[] = [];
  @Output() filterChange = new EventEmitter<{ [key: string]: any }>();

  filterValues: { [key: string]: any } = {};

  onFilterChange(): void {
    this.filterChange.emit(this.filterValues);
  }

  clearAll(): void {
    this.filterValues = {};
    this.filterChange.emit(this.filterValues);
  }

  setFilters(values: { [key: string]: any }): void {
    this.filterValues = { ...values };
  }
}
