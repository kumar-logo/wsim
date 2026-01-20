import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Roles } from '../enums/roles.enum';

export const adminGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();
  if (user && (user.role === Roles.ADMIN || user.role === Roles.SUPER_ADMIN || user.role === Roles.EMPLOYEE)) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
