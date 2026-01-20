import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  link?: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private mockNotifications: Notification[] = [
    { id: '1', type: 'success', title: 'File Processed', message: 'Portfolio.xlsx has been processed successfully', read: false, createdAt: new Date() },
    { id: '2', type: 'info', title: 'New Client', message: 'A new client registration is pending approval', read: false, createdAt: new Date(Date.now() - 3600000) },
  ];

  private notificationsSignal = signal<Notification[]>(this.mockNotifications);
  readonly notifications = this.notificationsSignal.asReadonly();
  readonly unreadCount = signal<number>(this.mockNotifications.filter(n => !n.read).length);

  getNotifications(): Observable<Notification[]> {
    return of(this.mockNotifications).pipe(delay(300));
  }

  markAsRead(id: string): void {
    const notification = this.mockNotifications.find(n => n.id === id);
    if (notification) {
      notification.read = true;
      this.notificationsSignal.set([...this.mockNotifications]);
      this.unreadCount.set(this.mockNotifications.filter(n => !n.read).length);
    }
  }

  markAllAsRead(): void {
    this.mockNotifications.forEach(n => n.read = true);
    this.notificationsSignal.set([...this.mockNotifications]);
    this.unreadCount.set(0);
  }

  deleteNotification(id: string): void {
    this.mockNotifications = this.mockNotifications.filter(n => n.id !== id);
    this.notificationsSignal.set([...this.mockNotifications]);
    this.unreadCount.set(this.mockNotifications.filter(n => !n.read).length);
  }
}
