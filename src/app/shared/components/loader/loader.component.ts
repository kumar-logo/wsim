import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../core/services/loader.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    @if (loaderService.isLoading()) {
      <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-sm">
        <div class="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
          <div class="relative">
            <div class="w-16 h-16 border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
            <div class="absolute top-0 left-0 w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p class="text-sm font-medium text-slate-600 dark:text-slate-300">{{ loaderService.loadingText() }}</p>
        </div>
      </div>
    }
  `
})
export class LoaderComponent {
  constructor(public loaderService: LoaderService) {}
}
