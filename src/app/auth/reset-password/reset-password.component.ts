import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  template: `
    <div class="min-h-screen flex items-center justify-center p-4 bg-slate-100 dark:bg-slate-900">
      <div class="w-full max-w-md">
        <div class="card p-8">
          <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
              </svg>
            </div>
            <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">Reset Password</h2>
            <p class="text-slate-500 dark:text-slate-400">Enter your new password below.</p>
          </div>

          <form (ngSubmit)="onSubmit()" class="space-y-5">
            <div>
              <label class="label">New Password</label>
              <input 
                type="password" 
                [(ngModel)]="password"
                name="password"
                placeholder="Enter new password"
                class="input"
                required
                minlength="8">
            </div>

            <div>
              <label class="label">Confirm Password</label>
              <input 
                type="password" 
                [(ngModel)]="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm new password"
                class="input"
                required>
            </div>

            <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1">
              <p>Password must contain:</p>
              <ul class="list-disc list-inside space-y-0.5">
                <li>At least 8 characters</li>
                <li>One uppercase letter</li>
                <li>One number</li>
                <li>One special character</li>
              </ul>
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
                Resetting...
              } @else {
                Reset Password
              }
            </button>
          </form>

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
export class ResetPasswordComponent {
  password = '';
  confirmPassword = '';
  loading = signal(false);
  private token = '';

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.token = this.route.snapshot.queryParams['token'] || '';
  }

  onSubmit(): void {
    if (!this.password || !this.confirmPassword) {
      this.toasterService.error('Validation Error', 'Please fill in all fields');
      return;
    }

    if (this.password !== this.confirmPassword) {
      this.toasterService.error('Validation Error', 'Passwords do not match');
      return;
    }

    if (this.password.length < 8) {
      this.toasterService.error('Validation Error', 'Password must be at least 8 characters');
      return;
    }

    this.loading.set(true);
    this.authService.resetPassword({ 
      token: this.token, 
      password: this.password, 
      confirmPassword: this.confirmPassword 
    }).subscribe({
      next: () => {
        this.toasterService.success('Success', 'Password reset successfully');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        this.toasterService.error('Error', error.message);
        this.loading.set(false);
      },
      complete: () => this.loading.set(false)
    });
  }
}
