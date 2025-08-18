/**
 * environment-config.ts
 *
 * Simple runtime-overridable environment configuration.
 * Phase 1: keep minimal and non-breaking. This file provides a single source
 * of truth for ApiRegistry baseUrl and a small set of feature toggles.
 *
 * How to override at runtime (non-breaking):
 * - Set window.__APP_ENV = { baseUrl: 'https://...', enableAuthInterceptor: true }
 * - Or modify DEFAULT_ENVIRONMENT before app bootstrapping (for advanced use)
 */

export type EnvironmentName = 'local' | 'dev' | 'uat' | 'prod';

export interface EnvironmentConfig {
  name: EnvironmentName;
  baseUrl: string;
  enableAuthInterceptor: boolean;
  defaultTimeoutMs: number;
}

export const DEFAULT_ENVIRONMENT: EnvironmentConfig = {
  // Per implementation plan, default to UAT base URL
  name: 'uat',
  baseUrl: 'https://vanui6iyhz.us-east-1.awsapprunner.com/',
  enableAuthInterceptor: false,
  defaultTimeoutMs: 30_000
};

/**
 * Reads runtime override from window.__APP_ENV (if provided).
 * This pattern is intentionally simple and non-breaking for Phase 1.
 */
export function getEnvironmentConfig(): EnvironmentConfig {
  try {
    const w = (window as any);
    if (w && typeof w.__APP_ENV === 'object' && w.__APP_ENV !== null) {
      return { ...DEFAULT_ENVIRONMENT, ...w.__APP_ENV };
    }
  } catch (e) {
    // swallow errors to avoid breaking app startup
    // (keep Phase 1 non-breaking)
  }
  return DEFAULT_ENVIRONMENT;
}
