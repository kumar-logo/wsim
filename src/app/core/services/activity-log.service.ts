import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface ActivityLog {
  id: string;
  userId: string;
  userName: string;
  action: string;
  resource: string;
  resourceId?: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ActivityLogService {
  private logs: ActivityLog[] = [
    { id: '1', userId: '1', userName: 'John Admin', action: 'LOGIN', resource: 'Auth', details: 'User logged in successfully', ipAddress: '192.168.1.100', userAgent: 'Chrome', timestamp: new Date() },
    { id: '2', userId: '1', userName: 'John Admin', action: 'CREATE', resource: 'Client', resourceId: '5', details: 'Created new client', ipAddress: '192.168.1.100', userAgent: 'Chrome', timestamp: new Date(Date.now() - 3600000) },
    { id: '3', userId: '2', userName: 'Sarah Manager', action: 'UPLOAD', resource: 'File', resourceId: '3', details: 'Uploaded positions file', ipAddress: '192.168.1.101', userAgent: 'Firefox', timestamp: new Date(Date.now() - 7200000) },
    { id: '4', userId: '1', userName: 'John Admin', action: 'UPDATE', resource: 'Settings', details: 'Updated system settings', ipAddress: '192.168.1.100', userAgent: 'Chrome', timestamp: new Date(Date.now() - 86400000) }
  ];

  getLogs(filters?: any): Observable<ActivityLog[]> {
    return of(this.logs).pipe(delay(500));
  }

  log(action: string, resource: string, details: string, resourceId?: string): void {
    this.logs.unshift({
      id: String(this.logs.length + 1),
      userId: '1', userName: 'Current User',
      action, resource, resourceId, details,
      ipAddress: '192.168.1.100', userAgent: navigator.userAgent,
      timestamp: new Date()
    });
  }
}
