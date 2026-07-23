# React + Vite Starter Kit

- This is a React starter kit designed for reusability and scalability.

## Tech Decisions

- **Framework**: React 19 + Vite for fast development and build times.
- **Language**: TypeScript for static typing and better developer experience.
- **Styling**: Tailwind CSS for utility-first styling.
- **UI Component Explorer**: Storybook for building and testing UI components in isolation.
- **Code Quality**: ESLint and Prettier for linting and formatting. Husky, lint-staged, and Commitlint for enforcing commit conventions and pre-commit checks.
- **Package Manager**: Yarn.

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   ```

2. **Install dependencies:**

   ```bash
   yarn install
   ```

3. **Start the development server:**

   ```bash
   yarn dev
   ```

## Environment Variables

This project uses Vite's environment variable system. All client-side variables must be prefixed with `VITE_`.

1. **Create a local environment file:**
   Copy `.env.example` to `.env.local` to start developing.

   ```bash
   cp .env.example .env.local
   ```

2. **Environment File Hierarchy:**
   - `.env.local`: Used for local development (git-ignored). Use this for your personal API keys and local overrides.
   - `.env.staging`: Used for the staging environment.
   - `.env.production`: Used for the production environment.

> **Note**: Environment variables are validated at runtime using Zod in `src/shared/utils/env.ts`.

## Scripts Explanation

- `yarn dev`: Starts the Vite development server.
- `yarn build`: Compiles TypeScript and builds the production bundle with Vite.
- `yarn lint`: Runs ESLint to find and fix problems in the code.
- `yarn preview`: Locally previews the production build.
- `yarn storybook`: Starts the Storybook development server on port 6006.
- `yarn build-storybook`: Builds the Storybook for production.
- `yarn prepare`: Sets up Husky git hooks.

## Architecture Summary

This starter kit is built upon a **Modular Feature-Based Architecture**, thoughtfully designed to scale and maintain long-term code quality.

## Folder Explanation

The key directories governing our source structure are:

- `src/app/`: Core application initialization, routing, and global abstractions.
- `src/modules/`: Feature-sliced directories (e.g., `auth/`, `dashboard/`), encapsulating their respective routing, hooks, sub-components, and feature-specific state logic.
- `src/shared/`: Generic components, utilities, and integrations universally utilized across feature-modules.
- `src/assets/`: Static assets like images and fonts.
- `src/stories/`: Storybook component stories.
- `src/styles/`: Global styles and Tailwind configuration.
- `docs/`: Project documentation, including comprehensive architecture guides.
- `public/`: Static files served directly without processing.

For a comprehensive guide, view the full [Architecture Documentation](./docs/architecture.md).

## Commit Format

Used **Husky**, **lint-staged**, and **Commitlint** to ensure high code quality and clear version history. Every commit must follow the [Conventional Commits](https://www.conventionalcommits.org/) format. If the commit message does not match these rules, the commit will be rejected.

### Commit Message Structure

```text
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

### Allowed Types

- **`feat`**: A new feature
- **`fix`**: A bug fix
- **`docs`**: Documentation only changes
- **`style`**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **`refactor`**: A code change that neither fixes a bug nor adds a feature
- **`perf`**: A code change that improves performance
- **`test`**: Adding missing tests or correcting existing tests
- **`build`**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **`ci`**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **`chore`**: Other changes that don't modify src or test files
- **`revert`**: Reverts a previous commit

### Examples

- `feat: add login overlay`
- `fix(auth): resolve token expiration issue`
- `docs: update README with commit format rules`

> **Note**: The commit message header must not be longer than 100 characters!
