import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/services/auth.service';

@Component({
  selector: 'app-client-navigation',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './client-navigation.component.html'
})
export class ClientNavigationComponent {
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();

  navSections = [
    {
      title: 'Overview',
      items: [
        {
          label: 'Dashboard',
          route: '/client/dashboard',
          icon: '<i class="fas fa-gauge-high"></i>'
        },
        {
          label: 'Portfolio',
          route: '/client/portfolio',
          icon: '<i class="fas fa-briefcase"></i>'
        }
      ]
    },
    {
      title: 'Investments',
      items: [
        {
          label: 'Positions',
          route: '/client/positions',
          icon: '<i class="fas fa-chart-line"></i>'
        },
        {
          label: 'Charts',
          route: '/client/charts',
          icon: '<i class="fas fa-chart-pie"></i>'
        }
      ]
    },
    {
      title: 'Reports',
      items: [
        {
          label: 'Reports',
          route: '/client/reports',
          icon: '<i class="fas fa-file-lines"></i>'
        }
      ]
    },
    {
      title: 'Account',
      items: [
        {
          label: 'Profile',
          route: '/client/profile',
          icon: '<i class="fas fa-user-circle"></i>'
        }
      ]
    }
  ];

  constructor(
    public authService: AuthService
  ) {
  }

}
