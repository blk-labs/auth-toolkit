# Auth Toolkit — React Example App

A working example app demonstrating how to integrate [`@auth-toolkit/core`](../../packages/core) and [`@blk-auth-toolkit/react`](../../packages/react) into a React project.

Use this as a reference when building your own authentication flows with the auth-toolkit packages.

## Tech Stack

| Layer | Technology |
| --- | --- |
| **Framework** | React 19 + Vite |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS v4 |
| **Routing** | React Router v7 |
| **Forms** | React Hook Form + Zod |
| **Data Fetching** | TanStack Query |
| **Auth** | `@auth-toolkit/core` + `@blk-auth-toolkit/react` |

## Getting Started

> **Prerequisite** — This app lives inside the `auth-toolkit` monorepo. Run all commands from the **monorepo root** unless stated otherwise.

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

```bash
cp apps/example-react/.env.example apps/example-react/.env.local
```

All client-side variables must be prefixed with `VITE_`. Environment variables are validated at runtime using Zod — see `src/shared/utils/env.ts`.

### 3. Build the packages

```bash
npm run build
```

### 4. Start the dev server

```bash
npm run dev -w apps/example-react
```

## Project Structure

```
src/
├── app/            # App shell — routing, providers, layout
├── modules/
│   ├── auth/       # Auth flows (login, signup, etc.) using auth-toolkit
│   ├── dashboard/  # Protected dashboard pages
│   └── wallet/     # Wallet module
├── shared/         # Shared components, hooks, and utilities
├── styles/         # Global styles and Tailwind config
└── assets/         # Static assets (images, fonts)
```

This app follows a **modular, feature-based architecture**. Each module encapsulates its own pages, components, hooks, and API logic. Public exports are surfaced through barrel `index.ts` files.

## Environment Files

| File | Purpose |
| --- | --- |
| `.env.example` | Template — commit this |
| `.env.local` | Local development overrides (git-ignored) |
| `.env.staging` | Staging environment |
| `.env.production` | Production environment |

## Available Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Vite dev server |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
| `npm run storybook` | Launch Storybook on port 6006 |

## Commit Conventions

This repo uses **Husky** + **Commitlint** to enforce [Conventional Commits](https://www.conventionalcommits.org/).

```
<type>[optional scope]: <description>
```

**Common types:** `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

```bash
# Examples
feat(auth): add login page with auth-toolkit
fix: resolve token refresh race condition
docs: update README with setup instructions
```

## Learn More

- [`@auth-toolkit/core`](../../packages/core) — Framework-agnostic authentication core
- [`@blk-auth-toolkit/react`](../../packages/react) — React bindings and hooks
