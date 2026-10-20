# Auth Toolkit - Production Readiness Assessment

**Date:** 2026-10-20 **Status:** Pre-v1.0 **Assessment Method:** Grilling session (structured interview)

---

## Executive Summary

The auth-toolkit monorepo has a solid foundation with:

- Framework-agnostic core (`@auth-toolkit/core`) - tokens, RBAC, HTTP client
- React integration (`@auth-toolkit/react`) - hooks, providers, route guards
- Admin demo showcasing basic usage

**But 10 gaps block a production v1.0 release.**

---

## Critical Gaps (Block v1.0)

### 1. Package Scope Unification ⚡ HIGH

**Current:** `@auth-toolkit/core` + `@blk-auth-toolkit/react` (inconsistent) **Decision:** Rename
`@blk-auth-toolkit/react` → `@auth-toolkit/react` ✅ **DONE** **Impact:** All imports, package.json, publish config

### 2. Code Quality Tooling ⚡ HIGH

**Missing:** ESLint, Prettier, typecheck scripts, CI pipeline **Decision:** Add to root package.json with GitHub Actions
**Commands needed:** `lint`, `format`, `typecheck`, `test` in CI

### 3. HttpClient Interceptors + Retry ⚡ HIGH

**Current:** Only 401 auto-refresh, no interceptors, no retry for other errors **Decision:** Add request/response hooks,
configurable retry, cancellation **Files:** `packages/core/src/https.ts`

### 4. React 18 Suspense + ErrorBoundary ⚡ HIGH

**Current:** AuthProvider uses useEffect for bootstrap, no Suspense integration **Decision:** Promise-based bootstrap,
AuthErrorBoundary component **Files:** `packages/react/src/providers/AuthProvider.tsx`, new `AuthErrorBoundary.tsx`

### 5. createAuthManager Factory 🔶 MEDIUM

**Current:** Apps import core directly to create AuthManager **Decision:** Export `createAuthManager()` from
`@auth-toolkit/react` with sensible defaults **Files:** New `packages/react/src/factories/createAuthManager.ts`

### 6. ReturnTo Unification 🔶 MEDIUM

**Current:** Two mechanisms - RequireAuth uses sessionStorage, AuthManager has own methods **Decision:** RequireAuth
uses AuthManager's `storeReturnTo`/`consumeReturnTo` **Files:** `packages/react/src/components/RequireAuth.tsx`,
`packages/core/src/AuthManager.ts`

### 7. Documentation Site 🔶 MEDIUM

**Current:** Minimal README only **Decision:** Typedoc API reference + framework guides (React, Next.js, Remix)
**Tools:** TypeDoc, VitePress or Nextra

---

## Important Gaps (Post-v1.0)

| Gap                                       | Decision                      |
| ----------------------------------------- | ----------------------------- |
| Refresh token storage + proactive refresh | Deferred - "get back to that" |
| Multi-tab sync via storage events         | User's choice of storage      |
| SSR CookieTokenStore                      | SPA only for now              |
| Demo tests                                | Add later                     |

---

## Non-Goals (Won't Do)

| Feature                                               | Reason                                  |
| ----------------------------------------------------- | --------------------------------------- |
| Password reset, email verification, MFA, social login | Core stays minimal (tokens + RBAC only) |
| Changesets / automated releases                       | Manual version bump + npm publish       |

---

## Package Completeness

| Package               | Status | Missing for v1.0                                                        |
| --------------------- | ------ | ----------------------------------------------------------------------- |
| `@auth-toolkit/core`  | ~90%   | HttpClient interceptors/retry, refresh token support                    |
| `@auth-toolkit/react` | ~85%   | Suspense/ErrorBoundary, createAuthManager factory, returnTo unification |
| `admin-demo`          | ~70%   | Tests, showcase returnTo flow, use factory                              |

---

## Admin-Demo Usage Correctness

**Pattern:** ✅ Professional - creates AuthManager (core) → passes to AuthProvider (react)

**Issues to fix:**

1. Uses custom `/auth-redirect` page instead of AuthManager's `consumeReturnTo()`
2. Imports core directly (solved by `createAuthManager` factory)
3. No tests as reference implementation

---

## Decisions Log

| Date       | Decision                           | Rationale                              |
| ---------- | ---------------------------------- | -------------------------------------- |
| 2026-10-20 | Unify to @auth-toolkit/* scope     | Consistent branding, simpler imports   |
| 2026-10-20 | Add ESLint+Prettier+typecheck      | CI guardrails for production quality   |
| 2026-10-20 | HttpClient interceptors + retry    | Robust HTTP layer for real apps        |
| 2026-10-20 | Suspense + ErrorBoundary           | Modern React 18 patterns               |
| 2026-10-20 | createAuthManager in react package | Hide core complexity, better DX        |
| 2026-10-20 | Unify returnTo in AuthManager      | Single source of truth                 |
| 2026-10-20 | Full docs site (Typedoc + guides)  | Professional developer experience      |
| 2026-10-20 | Manual version bump                | Simpler than changesets for small team |
| 2026-10-20 | Core stays minimal (tokens + RBAC) | Separation of concerns                 |
| 2026-10-20 | Demo uses AuthManager.returnTo     | Showcase built-in features             |

---

## Next Steps

1. Start with **package scope unification** (affects everything)
2. Add **code quality tooling** (enables CI)
3. Implement **HttpClient interceptors** (core functionality)
4. Add **Suspense/ErrorBoundary** (React integration)
5. Create **createAuthManager factory** (DX improvement)
6. **Unify returnTo** (consistency)
7. **Build docs site** (documentation)
8. **Update demo** (reference implementation)

---

_Generated from grilling session. Update as decisions change._
