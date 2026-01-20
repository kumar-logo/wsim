import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AdminService, DashboardStats, RecentActivity } from '../../core/services/admin.service';
import { ClientService } from '../../core/services/client.service';
import { CurrencyFormatPipe } from '../../shared/pipes/currency-format.pipe';
import { DateFormatPipe } from '../../shared/pipes/date-format.pipe';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, CurrencyFormatPipe, DateFormatPipe],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  stats = signal<DashboardStats | null>(null);
  recentActivity = signal<RecentActivity[]>([]);
  topClients = signal<any[]>([]);
  selectedPeriod = signal('1M');

  assetAllocations = [
    { name: 'Equities', percentage: 62.5, color: '#3b82f6' },
    { name: 'ETFs', percentage: 27.2, color: '#10b981' },
    { name: 'Fixed Income', percentage: 8.1, color: '#f59e0b' },
    { name: 'Cash', percentage: 2.2, color: '#6366f1' }
  ];

  constructor(
    private adminService: AdminService,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadRecentActivity();
    this.loadTopClients();
  }

  loadStats(): void {
    this.adminService.getDashboardStats().subscribe(stats => {
      this.stats.set(stats);
    });
  }

  loadRecentActivity(): void {
    this.adminService.getRecentActivity().subscribe(activity => {
      this.recentActivity.set(activity);
    });
  }

  loadTopClients(): void {
    this.clientService.getClients().subscribe(clients => {
      const sorted = clients.sort((a, b) => b.portfolioValue - a.portfolioValue).slice(0, 5);
      this.topClients.set(sorted);
    });
  }
}
