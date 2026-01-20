import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { ClientNavigationComponent } from './client-navigation/client-navigation.component';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ClientNavigationComponent],
  template: `
    <div class="min-h-screen bg-slate-100 dark:bg-slate-900 flex">
      <app-client-navigation 
        [collapsed]="sidebarCollapsed()"
        (toggleCollapse)="sidebarCollapsed.set(!sidebarCollapsed())">
      </app-client-navigation>

      <div class="flex-1 flex flex-col" [ngClass]="sidebarCollapsed() ? 'lg:ml-20' : 'lg:ml-64'">
        <header class="h-16 bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <div class="flex items-center gap-4">
            <button 
              (click)="sidebarCollapsed.set(!sidebarCollapsed())"
              class="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700">
              <svg class="w-6 h-6 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
            <h1 class="text-lg font-semibold text-slate-900 dark:text-white">Client Portal</h1>
          </div>

          <div class="flex items-center gap-2">
            <button 
              (click)="themeService.toggleTheme()"
              class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
              @if (themeService.isDark()) {
                <svg class="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path>
                </svg>
              } @else {
                <svg class="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path>
                </svg>
              }
            </button>

            <div class="relative ml-2">
              <button 
                (click)="showUserMenu.set(!showUserMenu())"
                class="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                <div class="avatar avatar-sm">
                  {{ authService.currentUser()?.firstName?.charAt(0) }}{{ authService.currentUser()?.lastName?.charAt(0) }}
                </div>
                <div class="hidden sm:block text-left">
                  <p class="text-sm font-medium text-slate-900 dark:text-white">
                    {{ authService.currentUser()?.firstName }} {{ authService.currentUser()?.lastName }}
                  </p>
                </div>
              </button>

              @if (showUserMenu()) {
                <div class="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden z-50">
                  <a href="/client/profile" class="dropdown-item flex items-center gap-2">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                    Profile
                  </a>
                  <button (click)="authService.logout()" class="dropdown-item flex items-center gap-2 w-full text-red-600 dark:text-red-400">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                    Sign out
                  </button>
                </div>
              }
            </div>
          </div>
        </header>

        <main class="flex-1 p-4 lg:p-6">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `
})
export class ClientLayoutComponent {
  sidebarCollapsed = signal(false);
  showUserMenu = signal(false);

  constructor(
    public themeService: ThemeService,
    public authService: AuthService
  ) {}
}
