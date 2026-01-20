import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Permissions } from '../enums/roles.enum';

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isSystem: boolean;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private mockRoles: Role[] = [
    {
      id: '1', name: 'Super Admin', description: 'Full system access with all permissions',
      permissions: Object.values(Permissions), isSystem: true,
      createdAt: new Date('2023-01-01'), updatedAt: new Date()
    },
    {
      id: '2', name: 'Admin', description: 'Administrative access',
      permissions: [Permissions.VIEW_DASHBOARD, Permissions.MANAGE_CLIENTS, Permissions.MANAGE_EMPLOYEES,
      Permissions.VIEW_REPORTS, Permissions.VIEW_POSITIONS, Permissions.VIEW_CHARTS],
      isSystem: true, createdAt: new Date('2023-01-01'), updatedAt: new Date()
    },
    {
      id: '3', name: 'Portfolio Manager', description: 'Manage client portfolios and positions',
      permissions: [Permissions.VIEW_DASHBOARD, Permissions.MANAGE_CLIENTS, Permissions.VIEW_REPORTS,
      Permissions.VIEW_POSITIONS, Permissions.MANAGE_POSITIONS, Permissions.VIEW_CHARTS],
      isSystem: false, createdAt: new Date('2023-02-15'), updatedAt: new Date()
    },
    {
      id: '4', name: 'Analyst', description: 'View and analyze data',
      permissions: [Permissions.VIEW_DASHBOARD, Permissions.VIEW_REPORTS, Permissions.VIEW_POSITIONS, Permissions.VIEW_CHARTS],
      isSystem: false, createdAt: new Date('2023-03-10'), updatedAt: new Date()
    },
    {
      id: '5', name: 'Client', description: 'Client portal access',
      permissions: [Permissions.VIEW_DASHBOARD, Permissions.VIEW_REPORTS, Permissions.VIEW_POSITIONS, Permissions.VIEW_CHARTS],
      isSystem: true, createdAt: new Date('2023-01-01'), updatedAt: new Date()
    }
  ];

  private rolesSignal = signal<Role[]>(this.mockRoles);
  readonly roles = this.rolesSignal.asReadonly();

  getRoles(): Observable<Role[]> {
    return of(this.mockRoles).pipe(delay(500));
  }

  getRole(id: string): Observable<Role | undefined> {
    return of(this.mockRoles.find(r => r.id === id)).pipe(delay(300));
  }

  createRole(role: Partial<Role>): Observable<Role> {
    const newRole: Role = {
      ...role as Role,
      id: String(this.mockRoles.length + 1),
      isSystem: false,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockRoles.push(newRole);
    this.rolesSignal.set([...this.mockRoles]);
    return of(newRole).pipe(delay(500));
  }

  updateRole(id: string, role: Partial<Role>): Observable<Role> {
    const index = this.mockRoles.findIndex(r => r.id === id);
    if (index !== -1) {
      this.mockRoles[index] = { ...this.mockRoles[index], ...role, updatedAt: new Date() };
      this.rolesSignal.set([...this.mockRoles]);
      return of(this.mockRoles[index]).pipe(delay(500));
    }
    return of(role as Role).pipe(delay(500));
  }

  deleteRole(id: string): Observable<boolean> {
    this.mockRoles = this.mockRoles.filter(r => r.id !== id);
    this.rolesSignal.set([...this.mockRoles]);
    return of(true).pipe(delay(500));
  }

  getAllPermissions(): string[] {
    return Object.values(Permissions);
  }
}
