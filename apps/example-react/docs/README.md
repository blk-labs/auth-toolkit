# Documentation Guide

Welcome to the agency starter kit documentation. This folder contains complete API references, usage examples, and prop documentation for all components and hooks.

## Quick Links

- **[COMPONENTS.md](./COMPONENTS.md)** - Complete API reference with JSDoc-style documentation for all components and hooks
- **[USAGE.md](./USAGE.md)** - Practical code examples showing how to use each component and hook
- **[PROPS.md](./PROPS.md)** - Detailed props reference tables for every component with types and descriptions

## What's Documented

### UI Components
- Button
- Input
- Textarea
- Select
- Card
- Badge
- Spinner
- Modal
- EmptyState

### Layout Components
- Container
- Stack
- Grid
- PageHeader
- SidebarLayout
- AppLayout

### Hooks
- `useTheme` - Theme management hook

### Utilities
- `classNames` - Conditional class joining utility

## Getting Started

1. **New to the project?** Start with [USAGE.md](./USAGE.md) to see practical examples of common tasks.

2. **Need detailed API docs?** Check [COMPONENTS.md](./COMPONENTS.md) for comprehensive JSDoc-style documentation.

3. **Looking up component props?** Browse [PROPS.md](./PROPS.md) for prop type reference tables.

## Common Tasks

### Using a Component
1. Find the component in [USAGE.md](./USAGE.md)
2. Copy the example code
3. Refer to [PROPS.md](./PROPS.md) for detailed prop descriptions

### Understanding Component Behavior
1. Check [COMPONENTS.md](./COMPONENTS.md) for the component's detailed description
2. Review the JSDoc "Returns" section to understand what it renders
3. Look at [USAGE.md](./USAGE.md) for real-world examples

### Finding Component Props
1. Search [PROPS.md](./PROPS.md) for the component name
2. Browse the props table for:
   - Type information
   - Whether it's required
   - Default values
   - Descriptions
   - Example values

## Documentation Structure

Each component documentation includes:

- **Description** - What the component does
- **Props** - Detailed prop documentation with:
  - Type signature
  - Required/Optional status
  - Default values (if any)
  - Usage description
  - Example values
- **Returns** - What the component renders
- **Examples** - Code snippets showing typical usage

---

If you have questions about a specific component or need more examples, refer to the component's stories in `.storybook/` or check the source files in `src/shared/components/`.
