import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { SettingService } from '../services/setting.service';
import { map } from 'rxjs/operators';

export const maintenanceGuard: CanActivateFn = () => {
  const settingService = inject(SettingService);
  return settingService.getSystemSettings().pipe(
    map(settings => !settings.maintenanceMode)
  );
};
