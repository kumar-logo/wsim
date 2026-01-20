import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, throwError, delay, tap } from 'rxjs';
import { User, LoginRequest, LoginResponse, ForgotPasswordRequest, ResetPasswordRequest, ChangePasswordRequest, UpdateProfileRequest } from '../models/user.model';
import { Roles } from '../enums/roles.enum';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_KEY = 'wsim_token';
  private readonly USER_KEY = 'wsim_user';

  private currentUserSignal = signal<User | null>(null);
  private isAuthenticatedSignal = signal<boolean>(false);

  readonly currentUser = this.currentUserSignal.asReadonly();
  readonly isAuthenticated = this.isAuthenticatedSignal.asReadonly();
  readonly isAdmin = computed(() => this.currentUserSignal()?.role === Roles.ADMIN || this.currentUserSignal()?.role === Roles.SUPER_ADMIN);
  readonly isClient = computed(() => this.currentUserSignal()?.role === Roles.CLIENT);

  private mockUsers: User[] = [
    {
      id: '1',
      email: 'admin@wsim.com',
      firstName: 'Gnanakumar',
      lastName: 'Administrator',
      role: Roles.ADMIN,
      phone: '+1 (555) 123-4567',
      address: '123 Wall Street',
      city: 'New York',
      state: 'NY',
      zipCode: '10005',
      country: 'USA',
      createdAt: new Date('2023-01-01'),
      updatedAt: new Date(),
      isActive: true,
      lastLogin: new Date()
    },
    {
      id: '2',
      email: 'client@wsim.com',
      firstName: 'Gnanakumar',
      lastName: 'Client',
      role: Roles.CLIENT,
      phone: '+1 (555) 987-6543',
      address: '456 Park Avenue',
      city: 'New York',
      state: 'NY',
      zipCode: '10022',
      country: 'USA',
      createdAt: new Date('2023-06-15'),
      updatedAt: new Date(),
      isActive: true,
      lastLogin: new Date()
    }
  ];

  constructor(private router: Router, private storageService: StorageService) {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const token = this.storageService.get<string>(this.TOKEN_KEY);
    const user = this.storageService.get<User>(this.USER_KEY);
    if (token && user) {
      this.currentUserSignal.set(user);
      this.isAuthenticatedSignal.set(true);
    }
  }

  login(request: LoginRequest): Observable<LoginResponse> {
    const user = this.mockUsers.find(u => u.email === request.email);
    if (!user) {
      return throwError(() => new Error('Invalid email or password')).pipe(delay(1000));
    }
    const response: LoginResponse = {
      user,
      token: 'mock_jwt_token_' + Date.now(),
      refreshToken: 'mock_refresh_token_' + Date.now(),
      expiresIn: 3600
    };
    return of(response).pipe(
      delay(1000),
      tap(res => {
        this.storageService.set(this.TOKEN_KEY, res.token);
        this.storageService.set(this.USER_KEY, res.user);
        this.currentUserSignal.set(res.user);
        this.isAuthenticatedSignal.set(true);
      })
    );
  }

  logout(): void {
    this.storageService.remove(this.TOKEN_KEY);
    this.storageService.remove(this.USER_KEY);
    this.currentUserSignal.set(null);
    this.isAuthenticatedSignal.set(false);
    this.router.navigate(['/auth/login']);
  }

  forgotPassword(request: ForgotPasswordRequest): Observable<{ message: string }> {
    return of({ message: 'Password reset link sent to your email' }).pipe(delay(1500));
  }

  resetPassword(request: ResetPasswordRequest): Observable<{ message: string }> {
    return of({ message: 'Password reset successfully' }).pipe(delay(1500));
  }

  changePassword(request: ChangePasswordRequest): Observable<{ message: string }> {
    return of({ message: 'Password changed successfully' }).pipe(delay(1500));
  }

  updateProfile(request: UpdateProfileRequest): Observable<User> {
    const currentUser = this.currentUserSignal();
    if (!currentUser) return throwError(() => new Error('Not authenticated'));
    const updatedUser: User = { ...currentUser, ...request, updatedAt: new Date() };
    return of(updatedUser).pipe(
      delay(1000),
      tap(user => {
        this.currentUserSignal.set(user);
        this.storageService.set(this.USER_KEY, user);
      })
    );
  }

  getToken(): string | null {
    return this.storageService.get<string>(this.TOKEN_KEY);
  }

  getRedirectUrl(): string {
    const user = this.currentUserSignal();
    if (!user) return '/auth/login';
    return user.role === Roles.CLIENT ? '/client/dashboard' : '/admin/dashboard';
  }
}
