import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../../core/services/employee.service';
import { Employee } from '../../../core/models/employee.model';
import { ToasterService } from '../../../core/services/toaster.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './employee-list.component.html',
})
export class EmployeeListComponent implements OnInit {
  employees = signal<Employee[]>([]);
  filteredEmployees = signal<Employee[]>([]);
  searchTerm = signal<string>('');
  selectedDepartment = signal<string>('all');
  isLoading = signal<boolean>(true);
  viewMode = signal<'table' | 'grid'>('grid');
  showDeleteModal = signal<boolean>(false);
  employeeToDelete = signal<Employee | null>(null);

  departments = ['all', 'Management', 'Sales', 'Operations', 'Technology', 'Compliance'];
  
  totalEmployees = computed(() => this.employees().length);
  activeEmployees = computed(() => this.employees().filter(e => e.status === 'active').length);

  constructor(
    private employeeService: EmployeeService,
    private toasterService: ToasterService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.isLoading.set(true);
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees.set(employees);
        this.applyFilters();
        this.isLoading.set(false);
      },
      error: () => {
        this.toasterService.error('Failed to load employees');
        this.isLoading.set(false);
      }
    });
  }

  applyFilters(): void {
    let result = [...this.employees()];
    
    const term = this.searchTerm().toLowerCase();
    if (term) {
      result = result.filter(e =>
        e.firstName.toLowerCase().includes(term) ||
        e.lastName.toLowerCase().includes(term) ||
        e.email.toLowerCase().includes(term) ||
        e.employeeCode.toLowerCase().includes(term)
      );
    }
    
    if (this.selectedDepartment() !== 'all') {
      result = result.filter(e => e.department === this.selectedDepartment());
    }
    
    this.filteredEmployees.set(result);
  }

  onSearchChange(term: string): void {
    this.searchTerm.set(term);
    this.applyFilters();
  }

  onDepartmentChange(dept: string): void {
    this.selectedDepartment.set(dept);
    this.applyFilters();
  }

  confirmDelete(employee: Employee): void {
    this.employeeToDelete.set(employee);
    this.showDeleteModal.set(true);
  }

  cancelDelete(): void {
    this.showDeleteModal.set(false);
    this.employeeToDelete.set(null);
  }

  deleteEmployee(): void {
    const employee = this.employeeToDelete();
    if (!employee) return;

    this.employeeService.deleteEmployee(employee.id).subscribe({
      next: () => {
        this.toasterService.success('Employee deleted successfully');
        this.showDeleteModal.set(false);
        this.loadEmployees();
      },
      error: () => this.toasterService.error('Failed to delete employee')
    });
  }

  getStatusColor(status: string): string {
    const colors: Record<string, string> = {
      active: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400',
      inactive: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400',
      onleave: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400'
    };
    return colors[status] || colors['active'];
  }

  getRoleColor(role: string): string {
    const colors: Record<string, string> = {
      admin: 'from-purple-500 to-pink-500',
      manager: 'from-blue-500 to-cyan-500',
      analyst: 'from-emerald-500 to-green-500',
      default: 'from-indigo-500 to-purple-500'
    };
    return colors[role.toLowerCase()] || colors['default'];
  }
}