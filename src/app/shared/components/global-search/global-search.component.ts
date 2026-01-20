import { Component, EventEmitter, Output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface SearchResult {
  id: string;
  type: 'client' | 'position' | 'file' | 'report';
  title: string;
  subtitle: string;
  url: string;
}

@Component({
  selector: 'app-global-search',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="relative">
      <div class="relative">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
        </svg>
        <input 
          type="text"
          [(ngModel)]="searchTerm"
          (ngModelChange)="onSearch($event)"
          (focus)="showResults = true"
          placeholder="Search clients, positions, files..."
          class="w-full pl-10 pr-4 py-2.5 bg-slate-100 dark:bg-slate-700 border-0 rounded-lg text-sm focus:ring-2 focus:ring-blue-500">
        @if (searchTerm) {
          <button 
            (click)="clearSearch()"
            class="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded">
            <svg class="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        }
      </div>

      @if (showResults && searchTerm) {
        <div class="absolute top-full mt-2 w-full bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
          @if (loading()) {
            <div class="p-4 text-center">
              <div class="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
            </div>
          } @else if (results().length > 0) {
            <div class="max-h-80 overflow-y-auto">
              @for (result of results(); track result.id) {
                <a 
                  [href]="result.url"
                  (click)="selectResult(result)"
                  class="flex items-center gap-3 p-3 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                  <div class="w-10 h-10 rounded-lg flex items-center justify-center"
                       [ngClass]="{
                         'bg-blue-100 dark:bg-blue-900/30': result.type === 'client',
                         'bg-emerald-100 dark:bg-emerald-900/30': result.type === 'position',
                         'bg-amber-100 dark:bg-amber-900/30': result.type === 'file',
                         'bg-purple-100 dark:bg-purple-900/30': result.type === 'report'
                       }">
                    <svg class="w-5 h-5" 
                         [ngClass]="{
                           'text-blue-600 dark:text-blue-400': result.type === 'client',
                           'text-emerald-600 dark:text-emerald-400': result.type === 'position',
                           'text-amber-600 dark:text-amber-400': result.type === 'file',
                           'text-purple-600 dark:text-purple-400': result.type === 'report'
                         }"
                         fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      @switch (result.type) {
                        @case ('client') {
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                        }
                        @case ('position') {
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                        }
                        @case ('file') {
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        }
                        @case ('report') {
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        }
                      }
                    </svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-slate-900 dark:text-white truncate">{{ result.title }}</p>
                    <p class="text-xs text-slate-500 truncate">{{ result.subtitle }}</p>
                  </div>
                </a>
              }
            </div>
          } @else {
            <div class="p-4 text-center text-sm text-slate-500">
              No results found for "{{ searchTerm }}"
            </div>
          }
        </div>
      }
    </div>
  `
})
export class GlobalSearchComponent {
  @Output() resultSelected = new EventEmitter<SearchResult>();

  searchTerm = '';
  showResults = false;
  loading = signal(false);
  results = signal<SearchResult[]>([]);

  private mockResults: SearchResult[] = [
    { id: '1', type: 'client', title: 'Michael Johnson', subtitle: 'CLI001 • Portfolio: $1.25M', url: '/admin/clients/1' },
    { id: '2', type: 'client', title: 'Sarah Williams', subtitle: 'CLI002 • Portfolio: $875K', url: '/admin/clients/2' },
    { id: '3', type: 'position', title: 'AAPL - Apple Inc.', subtitle: '500 shares • $89,250', url: '/admin/positions' },
    { id: '4', type: 'file', title: 'positions_q4_2023.xlsx', subtitle: 'Uploaded Dec 15, 2023', url: '/admin/uploaded-files/1' },
    { id: '5', type: 'report', title: 'Monthly Performance Report', subtitle: 'Generated Jan 1, 2024', url: '/admin/reports' }
  ];

  onSearch(term: string): void {
    if (!term) {
      this.results.set([]);
      return;
    }

    this.loading.set(true);
    setTimeout(() => {
      const filtered = this.mockResults.filter(r => 
        r.title.toLowerCase().includes(term.toLowerCase()) ||
        r.subtitle.toLowerCase().includes(term.toLowerCase())
      );
      this.results.set(filtered);
      this.loading.set(false);
    }, 300);
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.results.set([]);
    this.showResults = false;
  }

  selectResult(result: SearchResult): void {
    this.resultSelected.emit(result);
    this.clearSearch();
  }
}
