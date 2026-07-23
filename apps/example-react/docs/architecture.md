# Architectural Structure of Starter Kit

This starter kit follows a **Modular Feature-Based Architecture** designed for scalability, maintainability, and clean separation of concerns.

## Root Directory

- **`.env.*` files**: Environment configuration files (local, staging, production).

## Source Directory (`src/`)

The source code is organized primarily by features rather than by file type.

### `app/` — App Bootstrap & Global Config

This directory contains the entry points and global configurations for the application.

- **`App.tsx`**: The root application component that wraps the global providers and router.
- **`main.tsx`**: The entry point of the React application where the DOM is mounted.
- **`providers/`**: Global context providers (e.g., React Query, Theme, Redux/Zustand Store).

### `modules/` — Feature-Based Modules

Each module represents an independent feature domain within the application. It contains its own pages, components, hooks, API layer, and utilities.

Examples of modules:

- **`auth/`**: Authentication feature (login, register, forgot password).
- **`dashboard/`**: Dashboard feature and metrics.
- **`wallet/`**: Wallet and transaction features.

Each module follows this internal strict structure:

```text
module/
├── pages/          # Route-level page components (e.g., LoginPage.tsx)
├── components/     # Module-specific UI components
├── layouts/        # Module-specific layouts wrapper
├── hooks/          # Module-specific custom React hooks
├── api/            # API calls, mutations, and types specific to this module
├── utils/          # Module-specific helper functions
└── index.ts        # Public exports (barrel file) to strictly define the module's API
```

### `shared/` — Reusable Across Modules

This directory contains universally reusable code that is shared across multiple feature modules.

- **`components/common/`**: Generic, dumb UI components (Button, Input, Modal, Table).
- **`components/layout/`**: Global layout components (AppShell, Sidebar, Header, PageContainer).
- **`components/feedback/`**: Reusable feedback components (Spinner, ErrorState, Toast).
- **`hooks/`**: Shared custom hooks (e.g., `useDebounce`, `usePagination`, `useWindowSize`).
- **`api/`**: Base API client setup, Axios instance, request interceptors, and shared query keys.
- **`constants/`**: App-wide constants (e.g., pagination limits, route paths).
- **`types/`**: Global TypeScript types and interfaces used across the app.
- **`utils/`**: Shared utility functions (e.g., date formatters, currency formatters).
- **`config/`**: Global environment and app configuration variables.

### `assets/` — Static Assets

- **`images/`**: Static image files (PNG, JPG, SVG).
- **`icons/`**: Reusable icon files.

### `styles/` — Global Styles

- **`globals.css`**: The main global stylesheet, resetting defaults and setting base styles.
- **`variables.css`**: CSS custom properties (design tokens for colors, spacing, typography).
