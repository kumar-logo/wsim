import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoaderService } from '../services/loader.service';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loaderService = inject(LoaderService);
  
  if (!req.headers.has('X-Skip-Loader')) {
    loaderService.show();
  }

  return next(req).pipe(
    finalize(() => {
      if (!req.headers.has('X-Skip-Loader')) {
        loaderService.hide();
      }
    })
  );
};
