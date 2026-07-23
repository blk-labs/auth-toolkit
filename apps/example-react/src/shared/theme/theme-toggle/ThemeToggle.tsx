import { useState } from 'react';
import { useTheme } from '../useTheme';
import type { ThemeToggleProps } from './ThemeToggle.types';

const options = [
  { value: 'light', label: 'Light', icon: '☀️' },
  { value: 'dark', label: 'Dark', icon: '🌙' },
  { value: 'system', label: 'System', icon: '💻' },
] as const;

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const active = options.find((o) => o.value === theme) ?? options[2];

  return (
    <div className={`relative inline-block ${className ?? ''}`}>
      <button
        onClick={() => {
          setOpen((v) => !v);
        }}
        className="flex items-center gap-2 rounded-md border px-3 py-2 text-sm"
      >
        <span>{active.icon}</span>
        {active.label}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 rounded-md border bg-background shadow">
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setTheme(opt.value);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-muted ${
                theme === opt.value ? 'font-semibold' : ''
              }`}
            >
              <span>{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
