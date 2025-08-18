# Modern Endpoints & Models — Migration Plan (Phase 1 → Phase 2)

Status
- Intent: The modern models, generated services, ApiRegistry and ApiClientService are intended to replace the existing legacy endpoints during the upcoming development sprint.
- Current phase: Phase 1 (non‑breaking infra) completed for core services; Phase 2 (incremental migration) planned per-feature.

Purpose
This document explains the intended plan and how to use the modern layer during the migration sprint. It is a statement of intent and a migration roadmap so the team knows the canonical sources for models and endpoints.

What is included in the modern layer
- Models & generated API services (OpenAPI codegen)
  - Generated files: `src/app/models/models/*`, `src/app/models/services/*`, `src/app/models/core/*`
  - Facade (modern): `src/app/models/modern/index.ts` — use this as the stable import entrypoint for new code
- Endpoint registry & URL builder
  - Endpoint keys / templates: `src/app/config/api-endpoints.ts`
  - URL builder / registry: `src/app/config/api-registry.ts`
- HTTP & auth infra
  - Typed HTTP wrapper: `src/app/services/api-client.service.ts`
  - JWT lifecycle: `src/app/services/auth-token.service.ts`
  - Interceptor: `src/app/interceptor/auth-token.interceptor.ts` (registered but disabled by default in Phase 1)
  - Migration adapter: `src/app/services/migration-adapter.service.ts` — adapter for legacy consumers

Key principles
- Non-breaking Phase 1: Do not change public signatures of existing services. New infra must coexist with legacy code.
- Incremental migration: Migrate one feature/module at a time (Dashboard → next surface), validate tests and behavior, then move on.
- Use the modern facade: New or migrated code should import models/services from `src/app/models/modern`.
- Interceptor activation: Keep disabled globally until the first migrated feature is validated end-to-end; enable per-feature as appropriate.
- Tests: Use `src/test-utils/test-helpers.ts` for test-time mocks of native/Ionic providers. Remove temporary source patches once specs are updated.

Usage examples
- Import a model and generated service (modern facade):
  - import { CustomerMarketListResponse, ModernApIsDashboardService } from 'src/app/models/modern';
- Resolve an endpoint via ApiRegistry:
  - const url = ApiRegistry.buildUrl('ModernApIs.CustomerMarkets.List', { marketplaceId: 'abc' });
- Use ApiClientService:
  - apiClient.get<CustomerMarketListResponse>('CustomerMarkets.List', { marketplaceId: 'abc' });

Rollout plan (sprint-level)
1. Week 1 (kickoff)
   - Add this doc to repo and branch (feature/phase1-modern-facade-docs).
   - Create tests and test-helpers integration for a set of representative failing specs.
2. Week 1–2 (proof-of-integration)
   - Migrate Dashboard to use MigrationAdapterService + ApiClientService + models from `models/modern`.
   - Validate unit + integration tests for Dashboard.
   - Enable interceptor for Dashboard flows only (feature toggle), exercise refresh + retry.
3. Week 2–3 (incremental migration)
   - Migrate next modules by priority (e.g., Wallet, Transactions, User).
   - Remove legacy hardcoded URLs as features are migrated.
4. Finalization
   - When all consumers are migrated and tests pass, remove legacy httpClient.interceptor.ts and clean up legacy endpoints.

Branch/commit guidance (recommended)
- Branch name: feature/phase1-modern-facade-docs
- Commit steps (example):
  - git switch -c feature/phase1-modern-facade-docs
  - git add docs/modern-endpoints-migration.md src/app/models/modern/index.ts src/test-utils/test-helpers.ts
  - git commit -m "docs: add modern endpoints migration plan; feat(models): modern facade; test: add test-helpers"
  - git push -u origin feature/phase1-modern-facade-docs

Notes and caveats
- The modern facade re-exports the generated index to avoid moving generated files; this keeps codegen simple and low-risk.
- If you prefer generated output physically moved to `src/app/models/modern`, we can change the codegen output path — but that increases churn on regeneration and is not recommended for Phase 1.
- The interceptor is intentionally disabled by default to keep Phase 1 non-breaking. Enable only after per-feature validation.

Contact / owner
- Implementation lead: (add owner name here)
- For questions about specific endpoint keys, see `src/app/config/api-endpoints.ts`.
