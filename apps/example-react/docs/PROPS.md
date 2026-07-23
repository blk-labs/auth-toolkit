# Component Props Reference

This document provides detailed prop documentation for all UI and layout components in the agency starter kit, organized by component.

## UI Components

### Button

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `children` | `React.ReactNode` | Yes | — | Button text or content | `"Click me"` |
| `variant` | `"primary" \| "secondary" \| "outline" \| "ghost"` | No | `"primary"` | Visual style variant | `"secondary"` |
| `loading` | `boolean` | No | `false` | Shows spinner and disables when true | `true` |
| `disabled` | `boolean` | No | — | Disables interaction | `true` |
| `onClick` | `(e: React.MouseEvent) => void` | No | — | Click event handler | `() => alert('clicked')` |
| `type` | `"button" \| "submit" \| "reset"` | No | `"button"` | HTML button type | `"submit"` |
| `className` | `string` | No | — | Additional CSS classes | `"w-full"` |

---

### Input

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `label` | `string` | No | — | Label displayed above input | `"Email"` |
| `error` | `string` | No | — | Error message (red border when present) | `"Invalid email"` |
| `type` | `string` | No | `"text"` | HTML input type | `"email"` |
| `placeholder` | `string` | No | — | Placeholder text | `"Enter email"` |
| `value` | `string` | No | — | Current input value | `"user@example.com"` |
| `onChange` | `(e: React.ChangeEvent) => void` | No | — | Change event handler | `(e) => setValue(e.target.value)` |
| `disabled` | `boolean` | No | — | Disables input | `true` |
| `className` | `string` | No | — | Additional CSS classes | `"w-full"` |

---

### Textarea

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `label` | `string` | No | — | Label displayed above textarea | `"Comments"` |
| `error` | `string` | No | — | Error message (red border when present) | `"Too long"` |
| `placeholder` | `string` | No | — | Placeholder text | `"Enter your message"` |
| `value` | `string` | No | — | Current textarea value | `"User message"` |
| `onChange` | `(e: React.ChangeEvent) => void` | No | — | Change event handler | `(e) => setValue(e.target.value)` |
| `rows` | `number` | No | — | Number of visible rows | `5` |
| `cols` | `number` | No | — | Number of visible columns | `40` |
| `disabled` | `boolean` | No | — | Disables textarea | `true` |
| `className` | `string` | No | — | Additional CSS classes | `"w-full"` |

---

### Select

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `options` | `Array<{value: string; label: string}>` | Yes | — | Array of selectable options | `[{value: "us", label: "USA"}]` |
| `label` | `string` | No | — | Label displayed above select | `"Country"` |
| `error` | `string` | No | — | Error message (red border when present) | `"Selection required"` |
| `value` | `string` | No | — | Currently selected value | `"us"` |
| `onChange` | `(e: React.ChangeEvent) => void` | No | — | Change event handler | `(e) => setCountry(e.target.value)` |
| `disabled` | `boolean` | No | — | Disables select | `true` |
| `className` | `string` | No | — | Additional CSS classes | `"w-full"` |

---

### Card

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `children` | `React.ReactNode` | Yes | — | Card content | `<p>Card content</p>` |
| `className` | `string` | No | — | Additional CSS classes | `"max-w-md"` |

---

### Badge

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `children` | `React.ReactNode` | Yes | — | Badge label text | `"New"` |
| `color` | `"primary" \| "secondary" \| "success" \| "danger" \| "neutral"` | No | `"primary"` | Color variant | `"success"` |
| `className` | `string` | No | — | Additional CSS classes | `"uppercase"` |

---

### Spinner

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `size` | `"sm" \| "md" \| "lg"` | No | `"md"` | Size of spinner | `"lg"` |
| `color` | `"primary" \| "secondary" \| "success" \| "danger" \| "neutral"` | No | `"primary"` | Color variant | `"success"` |
| `className` | `string` | No | — | Additional CSS classes | `"mx-auto"` |

---

### Modal

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `isOpen` | `boolean` | Yes | — | Controls modal visibility | `true` |
| `onClose` | `() => void` | Yes | — | Callback when close button clicked | `() => setOpen(false)` |
| `title` | `string` | No | — | Modal title text | `"Confirm Action"` |
| `children` | `React.ReactNode` | Yes | — | Modal content | `<p>Are you sure?</p>` |
| `className` | `string` | No | — | Additional CSS classes for content | `"max-w-md"` |

---

### EmptyState

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `title` | `string` | No | `"No data available"` | Main heading text | `"No results found"` |
| `description` | `string` | No | — | Descriptive text below title | `"Try adjusting filters"` |
| `icon` | `React.ReactNode` | No | — | Icon or element above title | `<SearchIcon />` |
| `className` | `string` | No | — | Additional CSS classes | `"min-h-screen"` |

---

## Layout Components

### Container

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `size` | `"sm" \| "md" \| "lg" \| "xl" \| "2xl" \| "full"` | No | `"xl"` | Maximum width constraint | `"lg"` |
| `children` | `React.ReactNode` | Yes | — | Content to wrap | `<p>Content</p>` |
| `className` | `string` | No | — | Additional CSS classes | `"py-8"` |

**Size Mappings:**
- `sm`: `max-w-screen-sm` (640px)
- `md`: `max-w-screen-md` (768px)
- `lg`: `max-w-screen-lg` (1024px)
- `xl`: `max-w-screen-xl` (1280px)
- `2xl`: `max-w-screen-2xl` (1536px)
- `full`: `w-full` (100%)

---

### Stack

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `direction` | `"row" \| "col"` | No | `"col"` | Stack direction | `"row"` |
| `gap` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | No | `"md"` | Spacing between items | `"lg"` |
| `align` | `"start" \| "center" \| "end" \| "stretch"` | No | — | Item alignment (perpendicular to direction) | `"center"` |
| `justify` | `"start" \| "center" \| "end" \| "between" \| "around"` | No | — | Item justification (along direction) | `"between"` |
| `children` | `React.ReactNode` | Yes | — | Stack contents | Multiple elements |
| `className` | `string` | No | — | Additional CSS classes | `"my-4"` |

**Gap Mappings:**
- `xs`: 0.25rem (4px)
- `sm`: 0.5rem (8px)
- `md`: 1rem (16px)
- `lg`: 1.5rem (24px)
- `xl`: 2rem (32px)

---

### Grid

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `cols` | `1 \| 2 \| 3 \| 4 \| 5 \| 6 \| 12` | No | `1` | Number of columns | `3` |
| `gap` | `"xs" \| "sm" \| "md" \| "lg" \| "xl"` | No | `"md"` | Spacing between items | `"lg"` |
| `children` | `React.ReactNode` | Yes | — | Grid items | Multiple elements |
| `className` | `string` | No | — | Additional CSS classes | `"auto-rows-max"` |

---

### PageHeader

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `title` | `string` | Yes | — | Page title | `"Dashboard"` |
| `description` | `string` | No | — | Subtitle or description | `"Manage your account"` |
| `actions` | `React.ReactNode` | No | — | Right-side action buttons/elements | `<Button>Add Item</Button>` |
| `className` | `string` | No | — | Additional CSS classes | `"border-b pb-6"` |

---

### SidebarLayout

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `sidebar` | `React.ReactNode` | Yes | — | Sidebar content (navigation, etc.) | `<nav>...</nav>` |
| `sidebarWidth` | `string` | No | `"w-64"` | Tailwind width class for sidebar | `"w-48"` |
| `children` | `React.ReactNode` | Yes | — | Main content area | Page content elements |
| `className` | `string` | No | — | Additional CSS classes | `"h-screen"` |

**Note:** Sidebar is hidden on small screens and displayed on medium+ breakpoints.

---

### AppLayout

| Prop | Type | Required | Default | Description | Example |
|------|------|----------|---------|-------------|---------|
| `children` | `React.ReactNode` | Yes | — | Application content | Page components |

---

## Hook Return Types

### useTheme

**Returns:**
```typescript
{
  theme: "light" | "dark" | "system";
  resolvedTheme: "light" | "dark";
  setTheme: (theme: "light" | "dark" | "system") => void;
}
```

| Property | Type | Description |
|----------|------|-------------|
| `theme` | `"light" \| "dark" \| "system"` | Current theme preference setting |
| `resolvedTheme` | `"light" \| "dark"` | Actual theme being used (accounts for system preference) |
| `setTheme` | `(theme: Theme) => void` | Function to change the theme setting |

---

## Utility Functions

### classNames

**Signature:**
```typescript
function classNames(...classes: (string | boolean | undefined)[]): string
```

| Parameter | Type | Description |
|-----------|------|-------------|
| `...classes` | `(string \| boolean \| undefined)[]` | Variable number of class strings, booleans, or undefined |

**Returns:** `string` - Space-separated string of truthy class values

**Example Usage:**
```tsx
classNames(
  "padding-4",
  isActive && "bg-blue-500",
  disabled ? "opacity-50" : "cursor-pointer"
)
// Returns: "padding-4 bg-blue-500 cursor-pointer"
```

---

## Type Definitions

### ButtonVariant
```typescript
type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";
```

### BadgeColor
```typescript
type BadgeColor = "primary" | "secondary" | "success" | "danger" | "neutral";
```

### SpinnerSize
```typescript
type SpinnerSize = "sm" | "md" | "lg";
```

### ContainerSize
```typescript
type ContainerSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
```

### StackDirection
```typescript
type StackDirection = "row" | "col";
```

### StackGap
```typescript
type StackGap = "xs" | "sm" | "md" | "lg" | "xl";
```

### AlignType
```typescript
type AlignType = "start" | "center" | "end" | "stretch";
```

### JustifyType
```typescript
type JustifyType = "start" | "center" | "end" | "between" | "around";
```

### Theme
```typescript
type Theme = "light" | "dark" | "system";
```

---

## Common Patterns

### Controlled Components

All form components (Button, Input, Textarea, Select) follow React's controlled component pattern:

```tsx
const [value, setValue] = useState("");

<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
/>
```

### Error Handling

Form inputs support error states via the `error` prop:

```tsx
<Input
  label="Email"
  error={emailError ? "Invalid email" : undefined}
/>
```

### Ref Forwarding

Most components support ref forwarding for direct DOM access:

```tsx
const inputRef = useRef<HTMLInputElement>(null);

<Input ref={inputRef} />
```

### Composability

Layout components can be freely composed:

```tsx
<Container size="lg">
  <PageHeader title="Users" />
  <Grid cols={3} gap="md">
    {items.map(item => <Card key={item.id}>{item.name}</Card>)}
  </Grid>
</Container>
```
