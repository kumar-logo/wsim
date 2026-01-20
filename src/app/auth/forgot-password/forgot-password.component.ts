import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-900">
      <div class="w-full max-w-md">
        <div class="card p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Forgot Password?</h2>
            <p class="text-slate-500 dark:text-slate-400">No worries, we'll send you reset instructions.</p>
          </div>

          @if (!emailSent()) {
            <form (ngSubmit)="onSubmit()" class="space-y-5">
              <div>
                <label class="label">Email Address</label>
                <input 
                  type="email" 
                  [(ngModel)]="email"
                  name="email"
                  placeholder="you@example.com"
                  class="input"
                  required>
              </div>

              <button 
                type="submit" 
                [disabled]="loading()"
                class="btn btn-primary w-full py-3">
                @if (loading()) {
                  <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                } @else {
                  Send Reset Link
                }
              </button>
            </form>
          } @else {
            <div class="text-center">
              <div class="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-8 h-8 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <p class="text-slate-600 dark:text-slate-400 mb-4">
                We've sent a password reset link to<br>
                <span class="font-semibold text-slate-900 dark:text-white">{{ email }}</span>
              </p>
              <button (click)="emailSent.set(false)" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                Didn't receive the email? Try again
              </button>
            </div>
          }

          <div class="mt-8 text-center">
            <a routerLink="/auth/login" class="inline-flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ForgotPasswordComponent {
  email = '';
  loading = signal(false);
  emailSent = signal(false);

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService
  ) {}

  onSubmit(): void {
    if (!this.email) {
      this.toasterService.error('Validation Error', 'Please enter your email address');
      return;
    }

    this.loading.set(true);
    this.authService.forgotPassword({ email: this.email })
      .subscribe({
        next: () => {
          this.emailSent.set(true);
        },
        error: (error) => {
          this.toasterService.error('Error', error.message);
          this.loading.set(false);
        },
        complete: () => this.loading.set(false)
      });
  }
}
