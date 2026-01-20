import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OfflineService {
  private isOnlineSignal = signal<boolean>(navigator.onLine);
  readonly isOnline = this.isOnlineSignal.asReadonly();

  constructor() {
    window.addEventListener('online', () => this.isOnlineSignal.set(true));
    window.addEventListener('offline', () => this.isOnlineSignal.set(false));
  }
}
