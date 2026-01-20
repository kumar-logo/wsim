import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface SystemSettings {
  companyName: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  language: string;
  maintenanceMode: boolean;
}

export interface SecuritySettings {
  passwordMinLength: number;
  passwordRequireUppercase: boolean;
  passwordRequireNumbers: boolean;
  passwordRequireSymbols: boolean;
  sessionTimeout: number;
  maxLoginAttempts: number;
  twoFactorEnabled: boolean;
}

export interface NotificationSettings {
  emailNotifications: boolean;
  pushNotifications: boolean;
  smsNotifications: boolean;
  dailyDigest: boolean;
  alertThreshold: number;
}

@Injectable({
  providedIn: 'root'
})
export class SettingService {
  private systemSettings: SystemSettings = {
    companyName: 'WSIM - Wall Street Investment Management',
    timezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    currency: 'USD',
    language: 'en',
    maintenanceMode: false
  };

  private securitySettings: SecuritySettings = {
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumbers: true,
    passwordRequireSymbols: true,
    sessionTimeout: 30,
    maxLoginAttempts: 5,
    twoFactorEnabled: false
  };

  private notificationSettings: NotificationSettings = {
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    dailyDigest: true,
    alertThreshold: 5
  };

  getSystemSettings(): Observable<SystemSettings> {
    return of(this.systemSettings).pipe(delay(300));
  }

  updateSystemSettings(settings: Partial<SystemSettings>): Observable<SystemSettings> {
    this.systemSettings = { ...this.systemSettings, ...settings };
    return of(this.systemSettings).pipe(delay(500));
  }

  getSecuritySettings(): Observable<SecuritySettings> {
    return of(this.securitySettings).pipe(delay(300));
  }

  updateSecuritySettings(settings: Partial<SecuritySettings>): Observable<SecuritySettings> {
    this.securitySettings = { ...this.securitySettings, ...settings };
    return of(this.securitySettings).pipe(delay(500));
  }

  getNotificationSettings(): Observable<NotificationSettings> {
    return of(this.notificationSettings).pipe(delay(300));
  }

  updateNotificationSettings(settings: Partial<NotificationSettings>): Observable<NotificationSettings> {
    this.notificationSettings = { ...this.notificationSettings, ...settings };
    return of(this.notificationSettings).pipe(delay(500));
  }
}
