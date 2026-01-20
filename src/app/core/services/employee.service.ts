import { Injectable, signal } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Roles } from '../enums/roles.enum';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})

export class EmployeeService {
  private mockEmployees: Employee[] = [
    {
      id: '1', email: 'john.admin@wsim.com', firstName: 'John', lastName: 'Administrator',
      role: Roles.ADMIN, department: 'Management', position: 'CEO',
      phone: '+1 (555) 100-0001', isActive: true, hireDate: new Date('2020-01-01'),
      createdAt: new Date('2020-01-01'), updatedAt: new Date(),
      status: 'active', permissions: [Roles.ADMIN, Roles.EMPLOYEE], employeeCode: 'EMP001'
    },
    {
      id: '2', email: 'sarah.manager@wsim.com', firstName: 'Sarah', lastName: 'Manager',
      role: Roles.EMPLOYEE, department: 'Portfolio Management', position: 'Senior Portfolio Manager',
      phone: '+1 (555) 100-0002', isActive: true, hireDate: new Date('2021-03-15'),
      managerId: '1', createdAt: new Date('2021-03-15'), updatedAt: new Date(),
      status: 'active', permissions: [Roles.ADMIN], employeeCode: 'EMP002'
    },
    {
      id: '3', email: 'mike.analyst@wsim.com', firstName: 'Mike', lastName: 'Analyst',
      role: Roles.EMPLOYEE, department: 'Research', position: 'Financial Analyst',
      phone: '+1 (555) 100-0003', isActive: true, hireDate: new Date('2022-06-01'),
      managerId: '2', createdAt: new Date('2022-06-01'), updatedAt: new Date(),
      status: 'on_leave', permissions: [Roles.ADMIN, Roles.EMPLOYEE], employeeCode: 'EMP003'
    },
    {
      id: '4', email: 'lisa.advisor@wsim.com', firstName: 'Lisa', lastName: 'Advisor',
      role: Roles.EMPLOYEE, department: 'Client Services', position: 'Client Advisor',
      phone: '+1 (555) 100-0004', isActive: true, hireDate: new Date('2022-09-15'),
      managerId: '2', createdAt: new Date('2022-09-15'), updatedAt: new Date(),
      status: 'active', permissions: [Roles.ADMIN, Roles.EMPLOYEE], employeeCode: 'EMP04'
    },
    {
      id: '5', email: 'tom.junior@wsim.com', firstName: 'Tom', lastName: 'Junior',
      role: Roles.EMPLOYEE, department: 'Operations', position: 'Operations Associate',
      phone: '+1 (555) 100-0005', isActive: false, hireDate: new Date('2023-01-10'),
      managerId: '2', createdAt: new Date('2023-01-10'), updatedAt: new Date(),
      status: 'inactive', permissions: [Roles.ADMIN, Roles.EMPLOYEE], employeeCode: 'EMP005'
    }
  ];

  private employeesSignal = signal<Employee[]>(this.mockEmployees);
  readonly employees = this.employeesSignal.asReadonly();

  getEmployees(): Observable<Employee[]> {
    return of(this.mockEmployees).pipe(delay(500));
  }

  getEmployee(id: string): Observable<Employee | undefined> {
    return of(this.mockEmployees.find(e => e.id === id)).pipe(delay(300));
  }

  createEmployee(employee: Partial<Employee>): Observable<Employee> {
    const newEmployee: Employee = {
      ...employee as Employee,
      id: String(this.mockEmployees.length + 1),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockEmployees.push(newEmployee);
    this.employeesSignal.set([...this.mockEmployees]);
    return of(newEmployee).pipe(delay(500));
  }

  updateEmployee(id: string, employee: Partial<Employee>): Observable<Employee> {
    const index = this.mockEmployees.findIndex(e => e.id === id);
    if (index !== -1) {
      this.mockEmployees[index] = { ...this.mockEmployees[index], ...employee, updatedAt: new Date() };
      this.employeesSignal.set([...this.mockEmployees]);
      return of(this.mockEmployees[index]).pipe(delay(500));
    }
    return of(employee as Employee).pipe(delay(500));
  }

  deleteEmployee(id: string): Observable<boolean> {
    this.mockEmployees = this.mockEmployees.filter(e => e.id !== id);
    this.employeesSignal.set([...this.mockEmployees]);
    return of(true).pipe(delay(500));
  }
}
