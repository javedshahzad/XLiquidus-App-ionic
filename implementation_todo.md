# Implementation TODO (Phase 1 → Phase 2 migration)

This file captures a comprehensive checklist for completing Phase 1 (non-breaking infrastructure) and the Phase 2 migration plan described in `implementation_plan.md`.

## High-level goals
- Keep Phase 1 non-breaking (do not change AppService public signatures).
- Add modern HTTP + typed models layer that can live side-by-side with legacy code.
- Provide an adapter for incremental migration.
- Add tests and enable the new interceptor only after migration surface is validated.

## Checklist

- [ ] Step 0 — Analyze & prepare
  - [ ] Re-open and re-read `implementation_plan.md` (Overview, Types, Files, Functions, Classes, Dependencies, Testing, Implementation Order)
  - [ ] Inspect `openapi.json` and verify UAT base url and schemas
  - [ ] Confirm which endpoints in `api-endpoints.ts` are "modern" and map to OpenAPI operations

- [ ] Step 1 — Generate TypeScript models from OpenAPI
  - [ ] Run generation (recommended): `npx openapi-typescript-codegen --input openapi.json --output XLiquidus-App-ionic/src/app/models --useOptions --client axios` (review and adjust flags)
  - [ ] Manually review generated models for:
    - [ ] union types and discriminators
    - [ ] enums vs string literals
    - [ ] optional properties
    - [ ] circular references
  - [ ] Organize models into domains:
    - `/models/auth`
    - `/models/user`
    - `/models/wallet`
    - `/models/transaction`
    - `/models/market`
    - `/models/dashboard`
    - `/models/common`
  - [ ] Add or amend top-level barrel exports (index.ts) in each domain folder

- [ ] Step 2 — Environment & HTTP config
  - [ ] Create `src/app/config/environment-config.ts` with runtime toggle (UAT default) and typed config interface
  - [ ] Create `src/app/config/http-config.ts` for default headers, timeouts, and device-vs-browser HTTP choice
  - [ ] Wire `environment-config.ts` into `ApiRegistry` so baseUrl can be overridden at runtime

- [ ] Step 3 — Stabilize infrastructure (non-breaking)
  - [ ] Verify existing created files:
    - [ ] `config/api-registry.ts` (buildUrl, registerEndpoint)
    - [ ] `config/api-endpoints.ts` (endpoint keys)
    - [ ] `models/common/api-response.model.ts` (ApiResponse<T>)
    - [ ] `services/auth-token.service.ts`
    - [ ] `services/api-client.service.ts`
    - [ ] `interceptor/auth-token.interceptor.ts`
  - [ ] Add basic docs/comments for each public API
  - [ ] Add feature-flag or provider token to control enabling the new interceptor at bootstrap time

- [ ] Step 4 — Migration adapter
  - [ ] Implement `services/migration-adapter.service.ts`:
    - [ ] API surface compatible with current `app.service.ts` usage
    - [ ] Internally forwards to `ApiClientService` and uses `ApiRegistry` keys
  - [ ] Add tests for adapter/basic forwarding behavior

- [ ] Step 5 — Unit tests (Phase 1)
  - [ ] Unit tests for `AuthTokenService`
    - [ ] store/retrieve tokens
    - [ ] schedule refresh and cancel
    - [ ] refreshAccessToken() success/failure behaviors
  - [ ] Unit tests for `ApiRegistry`
    - [ ] buildUrl expected outputs for baseUrl + path + params
  - [ ] Unit tests for `ApiClientService`
    - [ ] inject auth header behavior
    - [ ] retry-on-refresh behavior when 401 occurs
    - [ ] correct mapping of endpoint keys to URLs
  - [ ] Unit tests for `AuthTokenInterceptor`
    - [ ] ensures Authorization header set when token present
    - [ ] triggers refresh and retries on 401
  - [ ] Add test harness/config changes if necessary (karma/jest)

- [ ] Step 6 — Minimal wiring in app.module.ts
  - [ ] Provide new services (AuthTokenService, ApiClientService, MigrationAdapterService)
  - [ ] Register `AuthTokenInterceptor` with an injection token or feature flag (kept disabled by default)
  - [ ] Do not remove legacy `httpClient.interceptor.ts` yet

- [ ] Step 7 — Migrate one surface (Dashboard) as proof-of-concept
  - [ ] Identify Dashboard endpoints and models to migrate
  - [ ] Replace calls in dashboard feature (component/service) to use `MigrationAdapterService` / `ApiClientService` and generated models
  - [ ] Write integration/unit tests for migrated dashboard surface
  - [ ] Run app in browser and device where applicable; verify behavior (UI, error handling, token refresh)

- [ ] Step 8 — Gradual migration
  - [ ] Prioritize next features (Auth → User → Wallet → Transaction → Market)
  - [ ] For each feature:
    - [ ] Migrate endpoints to use `MigrationAdapterService` or `ApiClientService`
    - [ ] Replace inline DTOs with typed models
    - [ ] Add/update tests
    - [ ] Remove corresponding hard-coded endpoints from `app.service.ts` once fully migrated

- [ ] Step 9 — Cleanup & Phase 2 finalization
  - [ ] Enable new interceptor globally in `app.module.ts`
  - [ ] Remove legacy `httpClient.interceptor.ts` and any duplicates
  - [ ] Remove legacy hardcoded endpoints and references in `app.service.ts`
  - [ ] Update `implementation_plan.md` with migration summary and decisions
  - [ ] Run full integration & e2e tests

- [ ] Step 10 — Documentation & delivery
  - [ ] Document new developer workflow (how to add endpoints + models)
  - [ ] Add examples for:
    - [ ] registering an endpoint with `ApiRegistry`
    - [ ] making calls with `ApiClientService`
    - [ ] migrating a legacy call via `MigrationAdapterService`
  - [ ] Finalize and close the Phase 1 checklist in `implementation_plan.md`

## Helpful commands (developer)
- Generate models (example):
  ```
  npx openapi-typescript-codegen --input openapi.json --output XLiquidus-App-ionic/src/app/models --useOptions
  ```
- Quick lint & test:
  ```
  cd XLiquidus-App-ionic ; npm ci ; npm run lint ; npm test
  ```
- Start dev server:
  ```
  cd XLiquidus-App-ionic ; npm run start
  ```

## Notes
- Keep changes non-breaking until dashboard migration is validated.
- Use localStorage for token storage to match current app patterns.
- Prefer small, incremental PRs per migrated feature to ease review.
