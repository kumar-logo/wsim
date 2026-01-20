import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Roles } from '../enums/roles.enum';

export const clientGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const user = authService.currentUser();
  if (user && user.role === Roles.CLIENT) {
    return true;
  }
  router.navigate(['/auth/login']);
  return false;
};
