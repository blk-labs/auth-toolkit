# Usage Examples

This document provides practical usage examples for the most commonly used components and hooks in the agency starter kit.

## UI Components

### Button

Basic button with click handler:

```tsx
import { Button } from "@/shared/components";

export function MyComponent() {
  const handleClick = () => {
    console.log("Button clicked!");
  };

  return <Button onClick={handleClick}>Click Me</Button>;
}
```

This renders a button with the primary color variant that logs to the console when clicked.

---

Button with different variants:

```tsx
import { Button } from "@/shared/components";

export function ButtonShowcase() {
  return (
    <div className="flex gap-2">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  );
}
```

This displays all four button variants side by side for comparison.

---

Button with loading state:

```tsx
import { Button } from "@/shared/components";
import { useState } from "react";

export function FormSubmit() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    await fetch("/api/submit", { method: "POST" });
    setIsLoading(false);
  };

  return (
    <Button loading={isLoading} onClick={handleSubmit}>
      {isLoading ? "Submitting..." : "Submit"}
    </Button>
  );
}
```

This shows a loading spinner in the button during the async operation and prevents re-submission.

---

### Input

Basic text input with label:

```tsx
import { Input } from "@/shared/components";
import { useState } from "react";

export function EmailForm() {
  const [email, setEmail] = useState("");

  return (
    <Input
      label="Email Address"
      type="email"
      placeholder="Enter your email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}
```

This creates a labeled email input field with a state-controlled value.

---

Input with validation error:

```tsx
import { Input } from "@/shared/components";
import { useState } from "react";

export function PasswordInput() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);

    if (value.length < 8) {
      setError("Password must be at least 8 characters");
    } else {
      setError("");
    }
  };

  return (
    <Input
      label="Password"
      type="password"
      placeholder="Enter a strong password"
      value={password}
      onChange={handleChange}
      error={error}
    />
  );
}
```

This shows how to display validation errors inline with the input field.

---

### Textarea

Basic textarea for long-form text:

```tsx
import { Textarea } from "@/shared/components";
import { useState } from "react";

export function CommentForm() {
  const [comment, setComment] = useState("");

  return (
    <Textarea
      label="Your Comment"
      placeholder="Leave your feedback here..."
      rows={5}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
    />
  );
}
```

This provides a multi-line input field perfect for longer text entries.

---

### Select

Dropdown with options:

```tsx
import { Select } from "@/shared/components";
import { useState } from "react";

export function CountrySelect() {
  const [country, setCountry] = useState("");

  const options = [
    { value: "us", label: "United States" },
    { value: "uk", label: "United Kingdom" },
    { value: "ca", label: "Canada" },
    { value: "au", label: "Australia" },
  ];

  return (
    <Select
      label="Select Your Country"
      options={options}
      value={country}
      onChange={(e) => setCountry(e.target.value)}
    />
  );
}
```

This renders a dropdown with predefined country options.

---

### Card

Card for content grouping:

```tsx
import { Card } from "@/shared/components";

export function UserCard() {
  return (
    <Card>
      <h2 className="text-lg font-semibold mb-2">John Doe</h2>
      <p className="text-sm text-neutral-600 mb-4">Product Designer</p>
      <p className="text-sm">
        Passionate about creating beautiful and functional user experiences.
      </p>
    </Card>
  );
}
```

This encases content in a styled card with padding, border, and subtle shadow.

---

### Badge

Status badges with different colors:

```tsx
import { Badge } from "@/shared/components";

export function UserStatus() {
  return (
    <div className="flex gap-2">
      <Badge color="success">Active</Badge>
      <Badge color="neutral">New</Badge>
      <Badge color="danger">Suspended</Badge>
      <span className="font-semibold">Status</span>
    </div>
  );
}
```

This shows different status badges with semantic colors (green for success, red for danger, etc.).

---

### Spinner

Loading indicator in a message:

```tsx
import { Spinner } from "@/shared/components";

export function LoadingMessage() {
  return (
    <div className="flex items-center gap-2">
      <Spinner size="sm" color="primary" />
      <span>Loading your data...</span>
    </div>
  );
}
```

This displays a small loading spinner next to informational text.

---

Different spinner sizes:

```tsx
import { Spinner } from "@/shared/components";

export function SpinnerShowcase() {
  return (
    <div className="flex gap-4 items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  );
}
```

This shows small, medium, and large spinner sizes for different use cases.

---

### Modal

Confirmation dialog:

```tsx
import { Modal, Button } from "@/shared/components";
import { useState } from "react";

export function DeleteConfirmation() {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    console.log("Deleting...");
    setOpen(false);
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>Delete Item</Button>

      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        title="Confirm Delete"
      >
        <div className="mb-6">
          <p>Are you sure you want to delete this item?</p>
          <p className="text-sm text-neutral-600 mt-2">
            This action cannot be undone.
          </p>
        </div>

        <div className="flex gap-2 justify-end">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
}
```

This creates a reusable confirmation modal for destructive actions.

---

### EmptyState

No results message:

```tsx
import { EmptyState } from "@/shared/components";

export function SearchResults({ results }: { results: any[] }) {
  if (results.length === 0) {
    return (
      <EmptyState
        title="No results found"
        description="Try adjusting your search terms or filters"
      />
    );
  }

  return <div>{/* render results */}</div>;
}
```

This shows a friendly message when a search or list returns no items.

---

## Layout Components

### Container

Centering and constraining content width:

```tsx
import { Container } from "@/shared/components/layout";

export function Page() {
  return (
    <Container size="lg">
      <h1>My Content</h1>
      <p>This content is centered and has a max width of lg</p>
    </Container>
  );
}
```

This wraps content with responsive padding and a maximum width constraint.

---

### Stack

Spacing elements vertically:

```tsx
import { Stack } from "@/shared/components/layout";

export function Form() {
  return (
    <Stack gap="md">
      <input type="text" placeholder="Name" />
      <input type="email" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Submit</button>
    </Stack>
  );
}
```

This vertically stacks form inputs with consistent spacing between them.

---

Stack for horizontal layout:

```tsx
import { Stack } from "@/shared/components/layout";
import { Button } from "@/shared/components";

export function ActionBar() {
  return (
    <Stack direction="row" gap="sm" justify="end">
      <Button variant="outline">Cancel</Button>
      <Button variant="primary">Save</Button>
    </Stack>
  );
}
```

This creates a horizontal row of buttons aligned to the right.

---

### Grid

Multi-column product grid:

```tsx
import { Grid } from "@/shared/components/layout";
import { Card } from "@/shared/components";

export function ProductGrid({ products }: { products: any[] }) {
  return (
    <Grid cols={3} gap="lg">
      {products.map((product) => (
        <Card key={product.id}>
          <h3>{product.name}</h3>
          <p className="text-sm text-neutral-600">${product.price}</p>
        </Card>
      ))}
    </Grid>
  );
}
```

This displays products in a responsive 3-column grid with gaps between items.

---

### PageHeader

Page title with actions:

```tsx
import { PageHeader } from "@/shared/components/layout";
import { Button } from "@/shared/components";

export function UsersPage() {
  return (
    <PageHeader
      title="Users"
      description="Manage application users and permissions"
      actions={
        <Button variant="primary">Add User</Button>
      }
    />
  );
}
```

This creates a page header with a title, description, and action button on the right.

---

### SidebarLayout

Dashboard layout with navigation sidebar:

```tsx
import { SidebarLayout } from "@/shared/components/layout";

export function Dashboard() {
  return (
    <SidebarLayout
      sidebar={
        <nav className="p-6">
          <p className="font-semibold mb-4">Navigation</p>
          <ul className="space-y-2">
            <li><a href="#dashboard">Dashboard</a></li>
            <li><a href="#users">Users</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </nav>
      }
      sidebarWidth="w-64"
    >
      <div className="p-6">
        <h1>Dashboard Content</h1>
      </div>
    </SidebarLayout>
  );
}
```

This creates a responsive two-column layout with a sidebar for navigation.

---

## Hooks

### useTheme

Accessing current theme:

```tsx
import { useTheme } from "@/shared/theme";

export function ThemeIndicator() {
  const { theme, resolvedTheme } = useTheme();

  return (
    <div>
      <p>Selected theme: {theme}</p>
      <p>Active theme: {resolvedTheme}</p>
    </div>
  );
}
```

This displays the currently selected theme and the actual resolved theme.

---

Changing theme:

```tsx
import { useTheme } from "@/shared/theme";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <button onClick={toggleTheme}>
      Switch to {theme === "light" ? "dark" : "light"} mode
    </button>
  );
}
```

This creates a button that toggles between light and dark themes.

---

System theme preference:

```tsx
import { useTheme } from "@/shared/theme";

export function ThemePreference() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2">
      <button onClick={() => setTheme("light")}>Light</button>
      <button onClick={() => setTheme("dark")}>Dark</button>
      <button onClick={() => setTheme("system")}>System</button>
      <p>Current: {theme}</p>
    </div>
  );
}
```

This provides buttons to switch between light, dark, and system preference modes.

---

## Integration Examples

### Form with validation

```tsx
import { Input, Button } from "@/shared/components";
import { useState } from "react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    let newErrors = { email: "", password: "" };

    if (!email.includes("@")) {
      newErrors.email = "Invalid email address";
    }

    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-md">
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errors.email}
      />
      <Input
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errors.password}
      />
      <Button
        onClick={handleSubmit}
        loading={isSubmitting}
        className="w-full mt-4"
      >
        Sign In
      </Button>
    </div>
  );
}
```

This demonstrates a complete login form with validation, error messages, and loading state.
