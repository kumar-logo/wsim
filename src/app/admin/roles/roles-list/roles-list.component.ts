import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RoleService } from '../../../core/services/role.service';
import { ToasterService } from '../../../core/services/toaster.service';
import { Role } from '../../../core/services/role.service';

@Component({
  selector: 'app-roles-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './roles-list.component.html',
})
export class RolesListComponent implements OnInit {
  roles = signal<Role[]>([]);
  isLoading = signal<boolean>(true);
  showDeleteModal = signal<boolean>(false);
  roleToDelete = signal<Role | null>(null);

  permissionCategories = [
    { name: 'Clients', permissions: ['view_clients', 'create_clients', 'edit_clients', 'delete_clients'] },
    { name: 'Positions', permissions: ['view_positions', 'manage_positions'] },
    { name: 'Reports', permissions: ['view_reports', 'export_reports'] },
    { name: 'Settings', permissions: ['manage_settings', 'manage_users'] }
  ];

  constructor(
    private roleService: RoleService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.loadRoles();
  }

  loadRoles(): void {
    this.isLoading.set(true);
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.roles.set(roles);
        this.isLoading.set(false);
      },
      error: () => {
        this.toasterService.error('Failed to load roles');
        this.isLoading.set(false);
      }
    });
  }

  confirmDelete(role: Role): void {
    if (role.isSystem) {
      this.toasterService.error('System roles cannot be deleted');
      return;
    }
    this.roleToDelete.set(role);
    this.showDeleteModal.set(true);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.roleToDelete.set(null);
  }

  deleteRole(): void {
    const role = this.roleToDelete();
    if (!role) return;

    this.roleService.deleteRole(role.id).subscribe({
      next: () => {
        this.toasterService.success('Role deleted successfully');
        this.showDeleteModal.set(false);
        this.loadRoles();
      },
      error: () => this.toasterService.error('Failed to delete role')
    });
  }

  getRoleColor(roleName: string): string {
    const colors: Record<string, string> = {
      'Admin': 'from-red-500 to-pink-600',
      'Manager': 'from-purple-500 to-indigo-600',
      'Analyst': 'from-blue-500 to-cyan-600',
      'Viewer': 'from-emerald-500 to-green-600'
    };
    return colors[roleName] || 'from-slate-500 to-slate-600';
  }
}