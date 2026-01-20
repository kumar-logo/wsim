import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AdminNavigationComponent } from './admin-navigation/admin-navigation.component';
import { GlobalSearchComponent } from '../../shared/components/global-search/global-search.component';
import { ThemeService } from '../../core/services/theme.service';
import { AuthService } from '../../core/services/auth.service';
import { NotificationService } from '../../core/services/notification.service';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, AdminNavigationComponent, GlobalSearchComponent],
  templateUrl: './admin-layout.component.html',
})
export class AdminLayoutComponent {
  sidebarCollapsed = signal(false);
  showNotifications = signal(false);
  showUserMenu = signal(false);

  constructor(
    public themeService: ThemeService,
    public authService: AuthService,
    public notificationService: NotificationService
  ) {}
}
