import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {
  const loadingService = inject(LoadingService);
  
  // Skip loading indicator for certain requests (optional)
  const skipLoading = req.headers.has('X-Skip-Loading') || 
                     req.url.includes('/api/health') || 
                     req.url.includes('/api/ping');

  if (!skipLoading) {
    loadingService.startLoading();
  }

  return next(req).pipe(
    finalize(() => {
      if (!skipLoading) {
        loadingService.stopLoading();
      }
    })
  );
};
