import { Injectable, signal, effect, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { StorageService } from './storage.service';

export type Theme = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly THEME_KEY = 'wsim_theme';

  private readonly document = inject(DOCUMENT);

  private readonly themeSignal = signal<Theme>('system');
  private readonly isDarkSignal = signal<boolean>(false);

  readonly theme = this.themeSignal.asReadonly();
  readonly isDark = this.isDarkSignal.asReadonly();

  constructor(private storageService: StorageService) {
    effect(
      () => {
        this.applyTheme(this.themeSignal());
      },
      { allowSignalWrites: true }
    );
  }

  initTheme(): void {
    const savedTheme =
      this.storageService.get<Theme>(this.THEME_KEY) ?? 'system';

    this.themeSignal.set(savedTheme);
  }

  setTheme(theme: Theme): void {
    this.themeSignal.set(theme);
    this.storageService.set(this.THEME_KEY, theme);
  }

  toggleTheme(): void {
    const current = this.themeSignal();
    this.setTheme(current === 'dark' ? 'light' : 'dark');
  }

  private applyTheme(theme: Theme): void {
    const prefersDark =
      window.matchMedia('(prefers-color-scheme: dark)').matches;

    const isDark =
      theme === 'dark' || (theme === 'system' && prefersDark);

    this.isDarkSignal.set(isDark);
    this.document.documentElement.classList.toggle('dark', isDark);
  }
}
