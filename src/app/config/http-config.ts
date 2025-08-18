/**
 * http-config.ts
 *
 * Centralized HTTP configuration for ApiClientService.
 * Phase 1: minimal, non-breaking defaults suitable for browser and device.
 *
 * - Exposes HttpConfig and helper functions to build request options.
 * - Allows runtime override via window.__APP_HTTP_CONFIG for testing or fast switches.
 *
 * Notes:
 * - This file intentionally avoids importing Angular or Capacitor types to keep it usable
 *   from non-Angular code (e.g., migration adapters) during Phase 1.
 * - Platform detection is conservative: if a runtime flag is provided it will be used.
 */

import { getEnvironmentConfig } from './environment-config';

export type HttpClientChoice = 'angular' | 'native';

export interface HttpConfig {
  defaultTimeoutMs: number;
  defaultHeaders: { [key: string]: string };
  useNativeWhenAvailable: boolean;
  preferredClient?: HttpClientChoice | undefined;
}

/**
 * Default configuration (kept conservative for Phase 1).
 * - defaultTimeoutMs is sourced from environment-config defaultTimeoutMs
 * - useNativeWhenAvailable is false by default to avoid device-only runtime behaviors
 */
export const DEFAULT_HTTP_CONFIG: HttpConfig = {
  defaultTimeoutMs: getEnvironmentConfig().defaultTimeoutMs || 30_000,
  defaultHeaders: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  useNativeWhenAvailable: false,
  preferredClient: undefined
};

/**
 * Runtime override helper. If window.__APP_HTTP_CONFIG is present it will merge
 * with DEFAULT_HTTP_CONFIG. This keeps Phase 1 non-breaking while allowing debug overrides.
 */
export function getHttpConfig(): HttpConfig {
  try {
    const w = (window as any);
    if (w && typeof w.__APP_HTTP_CONFIG === 'object' && w.__APP_HTTP_CONFIG !== null) {
      return { ...DEFAULT_HTTP_CONFIG, ...w.__APP_HTTP_CONFIG };
    }
  } catch {
    // swallow to remain non-breaking
  }
  return DEFAULT_HTTP_CONFIG;
}

/**
 * Conservative runtime platform detection to decide whether native HTTP may be available.
 * This does NOT force the app to use native HTTP; it only indicates availability.
 *
 * Detection heuristics:
 * - If user provided preferredClient in runtime config, respect it.
 * - If window.Capacitor is present and has 'isNative' truthy (common patterns).
 * - If navigator.userAgent contains 'Android' or 'iPhone' AND window.hasOwnProperty('capacitor').
 *
 * This function is intentionally permissive — ApiClientService should decide whether to use native.
 */
export function isNativeHttpLikelyAvailable(): boolean {
  try {
    const cfg = getHttpConfig();
    if (cfg.preferredClient === 'native') return true;
    if (cfg.preferredClient === 'angular') return false;

    const w = (window as any);
    if (w && typeof w.Capacitor === 'object') {
      // Some Capacitor setups expose a platform indicator; check common keys
      if (w.Capacitor.isNative === true) return true;
      if (w.Capacitor.platform && typeof w.Capacitor.platform === 'string') {
        const p = String(w.Capacitor.platform).toLowerCase();
        if (p === 'android' || p === 'ios') return true;
      }
    }

    if (typeof navigator !== 'undefined' && navigator.userAgent) {
      const ua = navigator.userAgent.toLowerCase();
      if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('android')) {
        // prefer native only if runtime flag allows it
        return !!cfg.useNativeWhenAvailable;
      }
    }
  } catch {
    // ignore detection failures
  }
  return false;
}

/**
 * Build request options usable by ApiClientService.
 * - Merges default headers with provided headers (caller can override).
 * - Returns an object with standard keys: headers, timeoutMs, withCredentials
 *
 * Note: This shape is generic — ApiClientService will translate it to the shape
 * expected by Angular HttpClient or native HTTP implementation.
 */
export function buildRequestOptions(overrides?: {
  headers?: { [k: string]: string };
  timeoutMs?: number;
  withCredentials?: boolean;
}) {
  const cfg = getHttpConfig();
  const headers = { ...cfg.defaultHeaders, ...(overrides?.headers || {}) };
  const timeoutMs = typeof overrides?.timeoutMs === 'number' ? overrides!.timeoutMs : cfg.defaultTimeoutMs;
  const withCredentials = overrides?.withCredentials === true;

  return {
    headers,
    timeoutMs,
    withCredentials
  };
}
