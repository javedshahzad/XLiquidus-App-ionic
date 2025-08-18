import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription, timer } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import jwtDecode from 'jwt-decode';
import { ApiRegistry } from 'src/app/config/api-registry';
import { catchError, switchMap, tap } from 'rxjs/operators';

export interface AuthTokenPayload {
  exp?: number;
  iat?: number;
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})
export class AuthTokenService {
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private tokenSubject = new BehaviorSubject<string | null>(this.getAccessToken());
  private refreshTimer?: any;

  constructor(private http: HttpClient, private apiRegistry: ApiRegistry) {
    this.scheduleTokenRefresh();
  }

  getAccessToken(): string | null {
    try {
      return localStorage.getItem(this.accessTokenKey);
    } catch (e) {
      return null;
    }
  }

  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(this.refreshTokenKey);
    } catch (e) {
      return null;
    }
  }

  setTokens(access: string | null, refresh?: string | null) {
    if (access) {
      localStorage.setItem(this.accessTokenKey, access);
      this.tokenSubject.next(access);
    } else {
      localStorage.removeItem(this.accessTokenKey);
      this.tokenSubject.next(null);
    }

    if (typeof refresh !== 'undefined') {
      if (refresh) {
        localStorage.setItem(this.refreshTokenKey, refresh);
      } else {
        localStorage.removeItem(this.refreshTokenKey);
      }
    }

    this.scheduleTokenRefresh();
  }

  clearTokens() {
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.tokenSubject.next(null);
    this.clearScheduledRefresh();
  }

  decodeToken(token?: string): AuthTokenPayload | null {
    const t = token || this.getAccessToken();
    if (!t) return null;
    try {
      return jwtDecode<AuthTokenPayload>(t);
    } catch (e) {
      return null;
    }
  }

  getTokenExpirationTime(token?: string): number | null {
    const payload = this.decodeToken(token);
    if (!payload || !payload.exp) return null;
    // exp is in seconds since epoch
    return payload.exp * 1000;
  }

  isTokenExpired(token?: string, offsetSeconds = 60): boolean {
    const expTime = this.getTokenExpirationTime(token);
    if (!expTime) return true;
    const offset = offsetSeconds * 1000;
    return Date.now() + offset >= expTime;
  }

  /**
   * Refresh access token using refresh token
   * - Uses ApiRegistry.Auth.RefreshToken endpoint key by default
   * - Expects the backend to accept { refresh_token } or similar payload
   */
  refreshAccessToken(): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      return of(null);
    }

    let url: string;
    try {
      url = this.apiRegistry.buildUrl('Auth.RefreshToken');
    } catch (e) {
      // If endpoint not registered, return null observable
      return of(null);
    }

    return this.http.post(url, { refresh_token: refreshToken }).pipe(
      tap((res: any) => {
        if (res && (res.access_token || res.id_token)) {
          const newAccess = res.access_token || res.id_token;
          const newRefresh = res.refresh_token || refreshToken;
          this.setTokens(newAccess, newRefresh);
        }
      }),
      catchError(err => {
        // If refresh fails, clear tokens
        this.clearTokens();
        return of(null);
      })
    );
  }

  /**
   * Schedule an automatic refresh shortly before token expiry.
   * This is called on construction and whenever tokens change.
   */
  scheduleTokenRefresh() {
    this.clearScheduledRefresh();
    const access = this.getAccessToken();
    if (!access) return;

    const exp = this.getTokenExpirationTime(access);
    if (!exp) return;

    const now = Date.now();
    // schedule refresh 60 seconds before expiry or at half the remaining time if very short
    const refreshAt = Math.max(now, exp - 60000);
    const msUntilRefresh = Math.max(0, refreshAt - now);

    this.refreshTimer = setTimeout(() => {
      // call refresh but do not force subscribe here; consumers can subscribe if needed
      this.refreshAccessToken().subscribe();
    }, msUntilRefresh);
  }

  private clearScheduledRefresh() {
    if (this.refreshTimer) {
      clearTimeout(this.refreshTimer);
      this.refreshTimer = undefined;
    }
  }

  /**
   * Expose token changes as observable
   */
  tokenChanges(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }
}
