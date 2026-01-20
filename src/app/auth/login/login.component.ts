import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  showPassword = signal(false);
  loading = signal(false);

  constructor(
    private authService: AuthService,
    private toasterService: ToasterService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.email || !this.password) {
      this.toasterService.error('Validation Error', 'Please enter email and password');
      return;
    }

    this.loading.set(true);
    this.authService.login({ email: this.email, password: this.password, rememberMe: this.rememberMe })
      .subscribe({
        next: (response) => {
          this.toasterService.success('Welcome back!', `Signed in as ${response.user.firstName}`);
          this.router.navigate([this.authService.getRedirectUrl()]);
        },
        error: (error) => {
          this.toasterService.error('Login Failed', error.message);
          this.loading.set(false);
        },
        complete: () => this.loading.set(false)
      });
  }
}
