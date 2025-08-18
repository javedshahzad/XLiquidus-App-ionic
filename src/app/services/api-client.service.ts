import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiRegistry } from 'src/app/config/api-registry';
import { AuthTokenService } from './auth-token.service';
import { ApiResponse } from 'src/app/models/common/api-response.model';

/**
 * Unified API client wrapper.
 * - Uses ApiRegistry to resolve endpoints by key (or accepts absolute/relative paths)
 * - Injects Authorization header using AuthTokenService
 * - Attempts token refresh on 401 and retries the request once
 *
 * Phase 1: Non-breaking wrapper. Existing services can be migrated to use this gradually.
 */
@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  constructor(
    private http: HttpClient,
    private apiRegistry: ApiRegistry,
    private tokenService: AuthTokenService
  ) {}

  private resolveUrl(endpointOrKey: string, params?: { [k: string]: any }): string {
    // If key exists in registry, build from key; otherwise treat endpointOrKey as path or full URL
    try {
      const possible = this.apiRegistry.getEndpoint(endpointOrKey);
      if (possible) {
        return this.apiRegistry.buildUrl(endpointOrKey, params);
      }
    } catch (e) {
      // ignore and treat as literal
    }

    // Interpolate params into provided path if any
    let url = endpointOrKey;
    if (params) {
      Object.keys(params).forEach(k => {
        const placeholder = `{${k}}`;
        if (url.includes(placeholder)) {
          url = url.replace(new RegExp(placeholder, 'g'), encodeURIComponent(String(params[k])));
        }
      });
    }
    return url;
  }

  private buildHeaders(additional?: { [k: string]: string }): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    const token = this.tokenService.getAccessToken();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }

    if (additional) {
      Object.keys(additional).forEach(k => {
        headers = headers.set(k, additional[k]);
      });
    }
    return headers;
  }

  private handle401AndRetry<T>(requestFn: () => Observable<T>): Observable<T> {
    return requestFn().pipe(
      catchError(err => {
        if (err && (err.status === 401 || err.status === 403)) {
          // Try refresh token flow
          return this.tokenService.refreshAccessToken().pipe(
            switchMap(_ => {
              // After refresh attempt, retry original request
              return requestFn();
            }),
            catchError(e => {
              // If refresh or retry fails, propagate original error
              return throwError(err);
            })
          );
        }
        return throwError(err);
      })
    );
  }

  get<T>(endpointOrKey: string, params?: { [k: string]: any }, query?: { [k: string]: any }, headers?: { [k: string]: string }): Observable<ApiResponse<T>> {
    const url = this.resolveUrl(endpointOrKey, params);
    let httpParams = new HttpParams();
    if (query) {
      Object.keys(query).forEach(k => {
        const val = query[k];
        if (val !== undefined && val !== null) {
          httpParams = httpParams.set(k, String(val));
        }
      });
    }

    const options = {
      headers: this.buildHeaders(headers),
      params: httpParams
    };

    return this.handle401AndRetry(() => this.http.get<ApiResponse<T>>(url, options));
  }

  post<T>(endpointOrKey: string, body: any, params?: { [k: string]: any }, headers?: { [k: string]: string }): Observable<ApiResponse<T>> {
    const url = this.resolveUrl(endpointOrKey, params);
    const options = {
      headers: this.buildHeaders(headers)
    };
    return this.handle401AndRetry(() => this.http.post<ApiResponse<T>>(url, body, options));
  }

  put<T>(endpointOrKey: string, body: any, params?: { [k: string]: any }, headers?: { [k: string]: string }): Observable<ApiResponse<T>> {
    const url = this.resolveUrl(endpointOrKey, params);
    const options = {
      headers: this.buildHeaders(headers)
    };
    return this.handle401AndRetry(() => this.http.put<ApiResponse<T>>(url, body, options));
  }

  patch<T>(endpointOrKey: string, body: any, params?: { [k: string]: any }, headers?: { [k: string]: string }): Observable<ApiResponse<T>> {
    const url = this.resolveUrl(endpointOrKey, params);
    const options = {
      headers: this.buildHeaders(headers)
    };
    return this.handle401AndRetry(() => this.http.patch<ApiResponse<T>>(url, body, options));
  }

  delete<T>(endpointOrKey: string, params?: { [k: string]: any }, headers?: { [k: string]: string }): Observable<ApiResponse<T>> {
    const url = this.resolveUrl(endpointOrKey, params);
    const options = {
      headers: this.buildHeaders(headers)
    };
    return this.handle401AndRetry(() => this.http.delete<ApiResponse<T>>(url, options));
  }

  /**
   * Simple file upload helper using formData.
   */
  upload<T>(endpointOrKey: string, formData: FormData, params?: { [k: string]: any }, headers?: { [k: string]: string }): Observable<ApiResponse<T>> {
    const url = this.resolveUrl(endpointOrKey, params);
    let httpHeaders = new HttpHeaders();
    const token = this.tokenService.getAccessToken();
    if (token) {
      httpHeaders = httpHeaders.set('Authorization', `Bearer ${token}`);
    }
    if (headers) {
      Object.keys(headers).forEach(k => {
        httpHeaders = httpHeaders.set(k, headers[k]);
      });
    }
    const options = { headers: httpHeaders };
    return this.handle401AndRetry(() => this.http.post<ApiResponse<T>>(url, formData, options));
  }
}
