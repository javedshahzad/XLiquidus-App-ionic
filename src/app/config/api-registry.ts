/**
 * Centralized API registry
 * - Maintains baseUrl and a map of endpoint keys -> paths
 * - Separates modern vs legacy endpoints (legacy are excluded by default)
 * - Designed to be lightweight and safe to add in Phase 1 (non-breaking)
 */

import { Injectable } from '@angular/core';
import { endpoints } from './api-endpoints';
import { getEnvironmentConfig } from './environment-config';

@Injectable({
  providedIn: 'root'
})
export class ApiRegistry {
  private baseUrl: string = getEnvironmentConfig().baseUrl || 'https://vanui6iyhz.us-east-1.awsapprunner.com/';
  private endpoints: Map<string, string> = new Map();

  constructor() {
    // Load endpoints from api-endpoints file (only modern endpoints should be included there)
    Object.keys(endpoints || {}).forEach(key => {
      this.endpoints.set(key, endpoints[key]);
    });
  }

  getBaseUrl(): string {
    return this.baseUrl;
  }

  setBaseUrl(url: string) {
    if (url && typeof url === 'string') {
      this.baseUrl = url.endsWith('/') ? url : url + '/';
    }
  }

  getEndpoint(key: string): string | undefined {
    return this.endpoints.get(key);
  }

  registerEndpoint(key: string, path: string) {
    this.endpoints.set(key, path);
  }

  getAllEndpoints(): Map<string, string> {
    return this.endpoints;
  }

  buildUrl(key: string, params?: { [k: string]: any }): string {
    const path = this.getEndpoint(key);
    if (!path) {
      throw new Error(`Endpoint not found for key: ${key}`);
    }

    // If path is absolute URL, return as-is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return this.interpolateParams(path, params);
    }

    const full = this.baseUrl.replace(/\/+$/, '') + '/' + path.replace(/^\/+/, '');
    return this.interpolateParams(full, params);
  }

  private interpolateParams(url: string, params?: { [k: string]: any }): string {
    if (!params) return url;
    let result = url;
    Object.keys(params).forEach(k => {
      const placeholder = `{${k}}`;
      if (result.includes(placeholder)) {
        result = result.replace(new RegExp(placeholder, 'g'), encodeURIComponent(String(params[k])));
      }
    });
    return result;
  }
}
