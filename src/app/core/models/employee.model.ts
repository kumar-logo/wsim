import { User } from '../models/user.model';
import { Roles } from '../enums/roles.enum';

export interface Employee extends User {
  department?: string;
  position?: string;
  managerId?: string;
  hireDate?: Date;
  salary?: number;
  status: EmployeeStatus;
  employeeCode: string;
  permissions: Roles[];
}

export type EmployeeStatus = 'active' | 'inactive' | 'on_leave';