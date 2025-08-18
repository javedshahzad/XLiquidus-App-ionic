import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthTokenService } from 'src/app/services/auth-token.service';
import { getEnvironmentConfig } from 'src/app/config/environment-config';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenInterceptor implements HttpInterceptor {
  constructor(private tokenService: AuthTokenService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Phase 1: allow runtime toggle to keep this interceptor effectively disabled by default.
    if (!getEnvironmentConfig().enableAuthInterceptor) {
      return next.handle(req);
    }

    const token = this.tokenService.getAccessToken();

    let authReq = req;
    if (token) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(authReq).pipe(
      catchError((err: HttpErrorResponse) => {
        // If unauthorized, attempt refresh and retry once
        if (err && (err.status === 401 || err.status === 403)) {
          return this.tokenService.refreshAccessToken().pipe(
            switchMap((res: any) => {
              const newToken = this.tokenService.getAccessToken();
              if (newToken) {
                const retryReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newToken}`
                  }
                });
                return next.handle(retryReq);
              }
              // If no token after refresh, propagate original error
              return throwError(() => err);
            }),
            catchError(() => {
              // If refresh failed, propagate original error
              return throwError(() => err);
            })
          );
        }
        return throwError(() => err);
      })
    );
  }
}
