import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { OfflineService } from '../services/offline.service';

export const networkGuard: CanActivateFn = () => {
  const offlineService = inject(OfflineService);
  return offlineService.isOnline();
};
