import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

interface NavItem {
  label: string;
  icon: string;
  route: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-admin-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './admin-navigation.component.html',
})
export class AdminNavigationComponent {
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();

  navSections = [
    {
      title: 'Admin',
      items: [
        { label: 'Dashboard', route: '/admin/dashboard', icon: '<i class="fas fa-gauge-high"></i>' },
        { label: 'Clients', route: '/admin/clients', icon: '<i class="fas fa-users"></i>' },
        { label: 'Employees', route: '/admin/employees', icon: '<i class="fas fa-user-tie"></i>' },
        { label: 'Roles', route: '/admin/roles', icon: '<i class="fas fa-shield-halved"></i>' }
      ]
    },
    {
      title: 'Operations',
      items: [
        { label: 'Positions', route: '/admin/positions', icon: '<i class="fas fa-chart-line"></i>' },
        { label: 'Excel Upload', route: '/admin/excel-upload', icon: '<i class="fas fa-file-excel"></i>' },
        { label: 'Uploaded Files', route: '/admin/uploaded-files', icon: '<i class="fas fa-folder-open"></i>' },
        { label: 'Strategy', route: '/admin/strategy', icon: '<i class="fas fa-chess"></i>' },
        { label: 'Master Strategy', route: '/admin/master-strategy', icon: '<i class="fas fa-chess-king"></i>' }
      ]
    },
    {
      title: 'Reports',
      items: [
        { label: 'Reports', route: '/admin/reports', icon: '<i class="fas fa-file-lines"></i>' },
        { label: 'Charts', route: '/admin/charts', icon: '<i class="fas fa-chart-pie"></i>' }
      ]
    },
    {
      title: 'Settings',
      items: [
        { label: 'Settings', route: '/admin/settings', icon: '<i class="fas fa-gear"></i>' }
      ]
    }
  ];

  constructor(
    public authService: AuthService
  ) {}

}
