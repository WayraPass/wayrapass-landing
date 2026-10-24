import { HttpInterceptorFn } from '@angular/common/http';

const TOKEN_KEY = 'wayrapass.accessToken';

export const authInterceptor: HttpInterceptorFn = (request, next) => {
  const token = typeof sessionStorage === 'undefined'
    ? null
    : sessionStorage.getItem(TOKEN_KEY);

  if (!token || !request.url.startsWith('/api/')) return next(request);

  return next(request.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  }));
};
