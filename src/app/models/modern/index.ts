// Modern models facade — re-export generated artifacts so new code can import from a stable "modern" entrypoint.
// This avoids moving generated files and keeps codegen configuration unchanged.
//
// Usage:
//   import { CustomerMarketListResponse } from 'src/app/models/modern';
//
// The generated package already exposes a top-level index.ts that aggregates models, services and core types.
// Re-export from that index to provide a single "modern" entrypoint.

export * from '../index';
