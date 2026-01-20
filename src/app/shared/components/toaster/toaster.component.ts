import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToasterService, Toast } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-[9998] flex flex-col gap-3 max-w-sm w-full">
      @for (toast of toasterService.toasts(); track toast.id) {
        <div 
          class="animate-slide-down p-4 rounded-xl shadow-lg border backdrop-blur-sm"
          [ngClass]="{
            'bg-emerald-50 border-emerald-200 dark:bg-emerald-900/20 dark:border-emerald-800': toast.type === 'success',
            'bg-red-50 border-red-200 dark:bg-red-900/20 dark:border-red-800': toast.type === 'error',
            'bg-amber-50 border-amber-200 dark:bg-amber-900/20 dark:border-amber-800': toast.type === 'warning',
            'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800': toast.type === 'info'
          }">
          <div class="flex items-start gap-3">
            <div class="flex-shrink-0">
              @switch (toast.type) {
                @case ('success') {
                  <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                }
                @case ('error') {
                  <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                }
                @case ('warning') {
                  <svg class="w-5 h-5 text-amber-600 dark:text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                  </svg>
                }
                @case ('info') {
                  <svg class="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                }
              }
            </div>
            <div class="flex-1">
              <p class="text-sm font-semibold" [ngClass]="{
                'text-emerald-800 dark:text-emerald-200': toast.type === 'success',
                'text-red-800 dark:text-red-200': toast.type === 'error',
                'text-amber-800 dark:text-amber-200': toast.type === 'warning',
                'text-blue-800 dark:text-blue-200': toast.type === 'info'
              }">{{ toast.title }}</p>
              @if (toast.message) {
                <p class="text-xs mt-1" [ngClass]="{
                  'text-emerald-700 dark:text-emerald-300': toast.type === 'success',
                  'text-red-700 dark:text-red-300': toast.type === 'error',
                  'text-amber-700 dark:text-amber-300': toast.type === 'warning',
                  'text-blue-700 dark:text-blue-300': toast.type === 'info'
                }">{{ toast.message }}</p>
              }
            </div>
            <button 
              (click)="toasterService.dismiss(toast.id)"
              class="flex-shrink-0 p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
              <svg class="w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      }
    </div>
  `
})
export class ToasterComponent {
  constructor(public toasterService: ToasterService) {}
}
