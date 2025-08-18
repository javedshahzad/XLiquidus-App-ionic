/**
 * MigrationAdapterService
 *
 * Purpose:
 * - Phase 1 non-breaking adapter to ease incremental migration from legacy AppService
 *   to the new ApiClientService + ApiRegistry model.
 * - Provides a drop-in, minimal surface that mirrors ApiClientService signatures so
 *   existing consumers can switch to this adapter with minimal change.
 *
 * Behavior:
 * - By default forwards calls to ApiClientService (which handles Authorization + refresh).
 * - Offers helper `callLegacyUrl` which allows calling absolute or legacy paths
 *   without requiring registration in ApiRegistry (useful for hybrid compatibility).
 *
 * Notes for implementers:
 * - Keep this file minimal and avoid changing existing public signatures during Phase 1.
 * - If AppService exposes specific helper methods (e.g., getDashboardSummary),
 *   add thin wrappers here that forward to ApiClientService. Add them on-demand
 *   when migrating a particular feature to minimize churn.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiClientService } from './api-client.service';
import { ApiRegistry } from 'src/app/config/api-registry';
import { ApiResponse } from 'src/app/models/common/api-response.model';

@Injectable({
  providedIn: 'root'
})
export class MigrationAdapterService {
  constructor(private apiClient: ApiClientService, private registry: ApiRegistry) {}

  /**
   * Generic GET proxy.
   * - endpointOrKey: either a registry key (preferred) or a literal path/URL.
   * - params: path params for interpolation (e.g., { userId: 'abc' }).
   * - query: query parameters appended to the URL.
   * - headers: optional additional headers.
   */
  get<T>(
    endpointOrKey: string,
    params?: { [k: string]: any },
    query?: { [k: string]: any },
    headers?: { [k: string]: string }
  ): Observable<ApiResponse<T>> {
    return this.apiClient.get<T>(endpointOrKey, params, query, headers);
  }

  /**
   * Generic POST proxy.
   */
  post<T>(
    endpointOrKey: string,
    body: any,
    params?: { [k: string]: any },
    headers?: { [k: string]: string }
  ): Observable<ApiResponse<T>> {
    return this.apiClient.post<T>(endpointOrKey, body, params, headers);
  }

  /**
   * Generic PUT proxy.
   */
  put<T>(
    endpointOrKey: string,
    body: any,
    params?: { [k: string]: any },
    headers?: { [k: string]: string }
  ): Observable<ApiResponse<T>> {
    return this.apiClient.put<T>(endpointOrKey, body, params, headers);
  }

  /**
   * Generic PATCH proxy.
   */
  patch<T>(
    endpointOrKey: string,
    body: any,
    params?: { [k: string]: any },
    headers?: { [k: string]: string }
  ): Observable<ApiResponse<T>> {
    return this.apiClient.patch<T>(endpointOrKey, body, params, headers);
  }

  /**
   * Generic DELETE proxy.
   */
  delete<T>(
    endpointOrKey: string,
    params?: { [k: string]: any },
    headers?: { [k: string]: string }
  ): Observable<ApiResponse<T>> {
    return this.apiClient.delete<T>(endpointOrKey, params, headers);
  }

  /**
   * File upload proxy (FormData)
   */
  upload<T>(
    endpointOrKey: string,
    formData: FormData,
    params?: { [k: string]: any },
    headers?: { [k: string]: string }
  ): Observable<ApiResponse<T>> {
    return this.apiClient.upload<T>(endpointOrKey, formData, params, headers);
  }

  /**
   * callLegacyUrl
   *
   * Directly call a literal URL or legacy endpoint that is not registered in ApiRegistry.
   * This is useful to avoid changing legacy code immediately — migrate a surface by
   * switching callers to MigrationAdapterService.callLegacyUrl(...) and then later
   * register the endpoint in ApiRegistry and update the call to use a stable key.
   *
   * Note: this simply proxies to ApiClientService which will apply auth + retry logic.
   */
  callLegacyUrl<T>(
    absoluteOrRelativeUrl: string,
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
    body?: any,
    query?: { [k: string]: any },
    headers?: { [k: string]: string }
  ): Observable<ApiResponse<T>> {
    // prefer using registered keys where available
    try {
      const key = this.registry.getEndpoint(absoluteOrRelativeUrl);
      if (key) {
        // The registry contains an entry that matches the literal - use the key
        return this.apiClient.get<T>(absoluteOrRelativeUrl);
      }
    } catch {
      // ignore and fallthrough to direct call
    }

    switch (method) {
      case 'GET':
        return this.apiClient.get<T>(absoluteOrRelativeUrl, undefined, query, headers);
      case 'POST':
        return this.apiClient.post<T>(absoluteOrRelativeUrl, body, undefined, headers);
      case 'PUT':
        return this.apiClient.put<T>(absoluteOrRelativeUrl, body, undefined, headers);
      case 'PATCH':
        return this.apiClient.patch<T>(absoluteOrRelativeUrl, body, undefined, headers);
      case 'DELETE':
        return this.apiClient.delete<T>(absoluteOrRelativeUrl, undefined, headers);
      default:
        return this.apiClient.get<T>(absoluteOrRelativeUrl, undefined, query, headers);
    }
  }

  /**
   * Helper to resolve a registry key and return the full URL string.
   * Useful for code that needs to know the final URL (e.g., analytics, logging).
   */
  resolveToUrl(keyOrPath: string, params?: { [k: string]: any }): string {
    try {
      // If it is a registry key, build the URL; if not, ApiRegistry.buildUrl will throw
      const endpoint = this.registry.getEndpoint(keyOrPath);
      if (endpoint) {
        return this.registry.buildUrl(keyOrPath, params);
      }
    } catch {
      // ignore and return literal interpolation
    }

    // Fallback: interpolate params into provided path
    let url = keyOrPath;
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
}
