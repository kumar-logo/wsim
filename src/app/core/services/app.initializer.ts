import { APP_INITIALIZER } from '@angular/core';
import { ThemeService } from './theme.service';

export function initializeApp(themeService: ThemeService) {
  return () => {
    themeService.initTheme();
    return Promise.resolve();
  };
}

export const appInitializerProvider = {
  provide: APP_INITIALIZER,
  useFactory: initializeApp,
  deps: [ThemeService],
  multi: true
};
