# Auth Toolkit 🛠️

A professional, modular authentication toolkit designed for modern web applications. This monorepo contains a framework-agnostic core engine and specialized UI wrappers.

## Monorepo Structure

This project is managed using **NPM Workspaces**.

- **`packages/core`**: The "Brain." Pure TypeScript logic, state management, and storage abstractions. Zero UI dependencies.
- **`packages/react`**: (Planned) The "UI Layer." React hooks and providers built on top of the core.
- **`apps/*`**: (Planned) Example applications and documentation sites.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js (v18+)
- NPM (v7+)

### 2. Installation
From the root of the project, run:
```bash
npm install