import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface DashboardStats {
  totalClients: number;
  openPositions: number;
  closedPositions: number;
  totalFiles: number;
  newClientsThisMonth: number;
  aumChangePercent: number;
  pendingFiles: number;
  activeAlerts: number;
}

export interface RecentActivity {
  id: string;
  type: 'client' | 'file' | 'position' | 'user';
  action: string;
  description: string;
  user: string;
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  getDashboardStats(): Observable<DashboardStats> {
    return of({
      totalClients: 156,
      openPositions: 100,
      closedPositions: 120,
      totalFiles: 89,
      newClientsThisMonth: 12,
      aumChangePercent: 8.5,
      pendingFiles: 3,
      activeAlerts: 7
    }).pipe(delay(500));
  }

  getRecentActivity(): Observable<RecentActivity[]> {
    const activities: RecentActivity[] = [
      {
        id: '1',
        type: 'file',
        action: 'uploaded',
        description: 'positions_q4_2023.xlsx uploaded',
        user: 'Gnanakumar',
        timestamp: new Date()
      },
      {
        id: '2',
        type: 'client',
        action: 'created',
        description: 'New client Michael Johnson added',
        user: 'Sarah Manager',
        timestamp: new Date(Date.now() - 60 * 60 * 1000)
      },
      {
        id: '3',
        type: 'position',
        action: 'updated',
        description: 'AAPL position updated for 3 clients',
        user: 'System',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
      },
      {
        id: '4',
        type: 'user',
        action: 'login',
        description: 'User logged in',
        user: 'Mike Analyst',
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000)
      }
    ];

    return of(activities).pipe(delay(300));
  }

}
