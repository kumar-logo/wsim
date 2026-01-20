import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private readonly SESSION_KEY = 'wsim_session';

  constructor(private storageService: StorageService) {}

  setSession(data: any): void {
    this.storageService.set(this.SESSION_KEY, { ...data, timestamp: Date.now() });
  }

  getSession(): any {
    return this.storageService.get(this.SESSION_KEY);
  }

  clearSession(): void {
    this.storageService.remove(this.SESSION_KEY);
  }

  isSessionValid(maxAge: number = 3600000): boolean {
    const session = this.getSession();
    if (!session) return false;
    return Date.now() - session.timestamp < maxAge;
  }
}
