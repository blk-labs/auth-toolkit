# Component & Hook API Reference

This document provides a complete API reference for all exported components and hooks in the agency starter kit, with JSDoc-style documentation.

## UI Components

### Button

**File:** `src/shared/components/Button/Button.tsx`

A versatile button component supporting multiple visual variants and loading states.

**Props:**
- `children: React.ReactNode` (required) - The button's content
- `variant?: "primary" | "secondary" | "outline" | "ghost"` (default: `"primary"`) - Visual style variant
- `loading?: boolean` (default: `false`) - Shows a spinner and disables the button when true
- `disabled?: boolean` - Disables click interaction when true
- `className?: string` - Additional CSS classes to apply
- All standard `ButtonHTMLAttributes<HTMLButtonElement>` are supported (e.g., `onClick`, `type`)

**Returns:** `React.ReactElement` - The rendered button component

**Description:**
A clickable button element with support for different visual styles and a loading state that displays a spinner and prevents interaction.

---

### Input

**File:** `src/shared/components/Input/Input.tsx`

A text input field component with optional label and error display.

**Props:**
- `label?: string` - Optional label text displayed above the input
- `error?: string` - Optional error message displayed below the input in red
- `disabled?: boolean` - Disables the input when true
- `className?: string` - Additional CSS classes to apply
- All standard `InputHTMLAttributes<HTMLInputElement>` are supported (e.g., `type`, `placeholder`, `onChange`, `value`)

**Returns:** `React.ReactElement` - The rendered input component with wrapper

**Description:**
A form input field that supports labels and error messaging. When an error is provided, the border color changes to red and the error message is displayed below the field.

---

### Textarea

**File:** `src/shared/components/Textarea/Textarea.tsx`

A multi-line text input field with optional label and error display.

**Props:**
- `label?: string` - Optional label text displayed above the textarea
- `error?: string` - Optional error message displayed below the textarea in red
- `disabled?: boolean` - Disables the textarea input and reduces opacity when true
- `className?: string` - Additional CSS classes for custom styling
- All standard `TextareaHTMLAttributes<HTMLTextAreaElement>` are supported (e.g., `placeholder`, `rows`, `cols`, `onChange`)

**Returns:** `React.ReactElement` - The rendered textarea component

**Description:**
A multi-line form input for capturing longer text entries. Supports integrated label and error messaging with disabled state styling.

---

### Select

**File:** `src/shared/components/Select/Select.tsx`

A dropdown selection field component with label and error display.

**Props:**
- `options: Array<{value: string; label: string}>` (required) - Array of selectable options
- `label?: string` - Optional label text displayed above the select
- `error?: string` - Optional error message displayed below the select in red
- `disabled?: boolean` - Disables the select when true
- `className?: string` - Additional CSS classes to apply
- All standard `SelectHTMLAttributes<HTMLSelectElement>` are supported

**Returns:** `React.ReactElement` - The rendered select component with wrapper

**Description:**
A form dropdown element that maps an array of option objects to `<option>` elements. Displays a label and error message when provided.

---

### Card

**File:** `src/shared/components/Card/Card.tsx`

A simple surface component for grouping content with subtle styling.

**Props:**
- `children: React.ReactNode` (required) - The card's content
- `className?: string` - Additional CSS classes to apply
- All standard `HTMLAttributes<HTMLDivElement>` are supported

**Returns:** `React.ReactElement` - The rendered card component

**Description:**
A lightweight container with a light background, border, rounded corners, and subtle shadow. Useful for visually separating groups of content.

---

### Badge

**File:** `src/shared/components/Badge/Badge.tsx`

A small, inline label component for tagging, categorizing, or highlighting items.

**Props:**
- `children: React.ReactNode` (required) - The content to display inside the badge
- `color?: "primary" | "secondary" | "success" | "danger" | "neutral"` (default: `"primary"`) - Color variant
- `className?: string` - Additional CSS classes to apply
- All standard `HTMLAttributes<HTMLSpanElement>` are supported

**Returns:** `React.ReactElement` - The rendered badge component

**Description:**
A small inline label rendered as a styled span. Typically used to display status, tags, or category labels. Supports five color variants.

---

### Spinner

**File:** `src/shared/components/Spinner/Spinner.tsx`

An animated loading indicator component for displaying pending operations.

**Props:**
- `size?: "sm" | "md" | "lg"` (default: `"md"`) - The size of the spinner
  - `"sm"`: Small (width/height 4)
  - `"md"`: Medium (width/height 6)
  - `"lg"`: Large (width/height 10)
- `color?: "primary" | "secondary" | "success" | "danger" | "neutral"` (default: `"primary"`) - Color variant of the spinner border
- `className?: string` - Additional CSS classes to apply

**Returns:** `React.ReactElement` - The rendered spinner component

**Description:**
A rotating circular loading indicator. Use when indicating that a background process is running. Combines customizable size and color options.

---

### Modal

**File:** `src/shared/components/Modal/Modal.tsx`

A modal dialog component with a title, content, and close button.

**Props:**
- `isOpen: boolean` (required) - Controls whether the modal is visible
- `onClose: () => void` (required) - Callback fired when the close button is clicked
- `title?: string` - Optional title shown at the top of the modal
- `children: React.ReactNode` (required) - The modal's main content
- `className?: string` - Additional CSS classes for the modal content wrapper

**Returns:** `React.ReactElement | null` - The rendered modal or null if not open

**Description:**
A centered dialog that overlays a semi-transparent backdrop. Renders only when `isOpen` is true. Includes a close button that calls the `onClose` callback. Use for confirmations, forms, or other focused interactions.

---

### EmptyState

**File:** `src/shared/components/EmptyState/EmptyState.tsx`

A centered message component displayed when there is no data to show.

**Props:**
- `title?: string` (default: `"No data available"`) - The main heading text
- `description?: string` - Optional descriptive text displayed below the title
- `icon?: React.ReactNode` - Optional icon or element to display above the title
- `className?: string` - Additional CSS classes to apply
- All standard `HTMLAttributes<HTMLDivElement>` are supported

**Returns:** `React.ReactElement` - The rendered empty state component

**Description:**
A centered container for displaying a message when a list, table, or section has no content. Supports an optional icon and description for context.

---

## Layout Components

### Container

**File:** `src/shared/components/layout/Container/Container.tsx`

A responsive wrapper that centers content and constrains its maximum width.

**Props:**
- `size?: "sm" | "md" | "lg" | "xl" | "2xl" | "full"` (default: `"xl"`) - The maximum width constraint
- `className?: string` - Additional CSS classes to apply
- All standard `HTMLAttributes<HTMLDivElement>` are supported

**Returns:** `React.ReactElement` - The rendered container component

**Description:**
A utility component that wraps content and provides responsive horizontal padding. The `size` prop controls the maximum width (using Tailwind classes like `max-w-screen-lg`). `size="full"` removes the width constraint while keeping padding.

---

### Stack

**File:** `src/shared/components/layout/Stack/Stack.tsx`

A flex-based layout component for arranging items in a row or column.

**Props:**
- `direction?: "row" | "col"` (default: `"col"`) - Stack direction (row or column)
- `gap?: "xs" | "sm" | "md" | "lg" | "xl"` (default: `"md"`) - Spacing between items
- `align?: "start" | "center" | "end" | "stretch"` - Alignment of items (perpendicular to direction)
- `justify?: "start" | "center" | "end" | "between" | "around"` - Justification of items (along direction)
- `className?: string` - Additional CSS classes to apply

**Returns:** `React.ReactElement` - The rendered stack component

**Description:**
A wrapper around flexbox that simplifies creating rows and columns. Use for spacing and aligning child elements. Combines directional, gap, alignment, and justification props.

---

### Grid

**File:** `src/shared/components/layout/Grid/Grid.tsx`

A CSS Grid layout component for creating responsive multi-column layouts.

**Props:**
- `cols?: 1 | 2 | 3 | 4 | 5 | 6 | 12` (default: `1`) - Number of columns
- `gap?: "xs" | "sm" | "md" | "lg" | "xl"` (default: `"md"`) - Spacing between grid items
- `className?: string` - Additional CSS classes to apply
- All standard `HTMLAttributes<HTMLDivElement>` are supported

**Returns:** `React.ReactElement` - The rendered grid component

**Description:**
A CSS Grid wrapper for creating multi-column layouts. The `cols` prop sets the number of columns, and `gap` controls spacing between items. Use for gallery-like layouts or data displays.

---

### PageHeader

**File:** `src/shared/components/layout/PageHeader/PageHeader.tsx`

A semantic header component for page titles and descriptions.

**Props:**
- `title: string` (required) - The main page title
- `description?: string` - Optional subtitle or description text
- `actions?: React.ReactNode` - Optional content (e.g., buttons) displayed on the right
- `className?: string` - Additional CSS classes to apply
- All standard `HTMLAttributes<HTMLElement>` are supported

**Returns:** `React.ReactElement` - The rendered header component

**Description:**
A semantic `<header>` element that displays a title and optional description, with an actions slot on the right. On mobile, it stacks vertically; on desktop, it's a row.

---

### SidebarLayout

**File:** `src/shared/components/layout/SidebarLayout/SidebarLayout.tsx`

A two-column layout with a collapsible sidebar on the left and main content on the right.

**Props:**
- `sidebar: React.ReactNode` (required) - Content to display in the sidebar
- `sidebarWidth?: string` (default: `"w-64"`) - Tailwind width class for the sidebar (e.g., `"w-48"`, `"w-80"`)
- `children: React.ReactNode` - Main content area
- `className?: string` - Additional CSS classes to apply
- All standard `HTMLAttributes<HTMLDivElement>` are supported

**Returns:** `React.ReactElement` - The rendered sidebar layout

**Description:**
A responsive two-column layout. The sidebar is hidden on small screens and displayed on medium+ breakpoints. Use for dashboard or admin layouts.

---

### AppLayout

**File:** `src/shared/components/layout/AppLayout.tsx`

A complete application layout component combining navigation, sidebar, and content areas.

**Description:**
(See visual composition in Storybook stories or component file for detailed structure)

---

## Hooks

### useTheme

**File:** `src/shared/theme/useTheme.ts`

Hook for accessing and managing the application theme (light, dark, or system).

**Returns:**
```typescript
{
  theme: "light" | "dark" | "system";      // Current theme setting
  resolvedTheme: "light" | "dark";         // Actual resolved theme based on system preference
  setTheme: (theme: "light" | "dark" | "system") => void;  // Function to change theme
}
```

**Throws:** `Error` if used outside of a `<ThemeProvider>`

**Description:**
Provides access to the current theme setting and a function to change it. The `resolvedTheme` reflects the actual theme being used (accounting for system preferences if theme is `"system"`). Must be used within a `<ThemeProvider>` wrapper.

---

## Context Providers

### ThemeProvider

**File:** `src/shared/theme/ThemeProvider.tsx`

Wraps your application to provide theme management context.

**Props:**
- `children: React.ReactNode` (required) - The application component tree

**Features:**
- Initializes theme from localStorage
- Applies theme to the document root element
- Listens to system theme preference changes
- Persists user's theme choice

**Description:**
A context provider that manages light/dark/system theme state. It applies the theme class to the document root and listens for system preference changes. Place it near the top of your component tree to ensure all components have access to `useTheme()`.

---

## Utility Functions

### classNames

**File:** `src/shared/components/utils/classNames.ts`

A utility function for conditionally joining class names.

**Signature:**
```typescript
function classNames(...classes: (string | boolean | undefined)[]): string
```

**Params:**
- `...classes: (string | boolean | undefined)[]` - A variadic list of class strings, booleans, or undefined values

**Returns:** `string` - A space-separated string of truthy class values

**Description:**
Filters out falsy values (false, undefined) from a list of class name arguments and joins the remaining strings with spaces. Useful for conditionally adding Tailwind classes without complex ternary operators.

---

## Configuration

### env

**File:** `src/shared/config/env.ts`

Environment configuration helper.

**Description:**
Provides access to environment variables used throughout the application.
