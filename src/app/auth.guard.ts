import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let routerService = inject(Router)
  if (!authService.isLoggedIn()) {
      routerService.navigate(['/login']);
      return false;
  }
  return true;
};

export const authGuardEmail: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let routerService = inject(Router)
  if (!authService.isLoggedIn()) {
      routerService.navigate(['/register']);
      return false;
  }
  return true;
};
