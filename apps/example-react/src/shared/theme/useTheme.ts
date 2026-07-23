import { useContext } from 'react';
import type { ThemeContextValue } from './ThemeContext';
import { ThemeContext } from './ThemeContext';

/**
 * Custom hook for accessing the current theme context. Must be used within ThemeProvider.
 * This hook provides access to the current theme state, resolved theme, and the ability to change themes.
 *
 * @throws {Error} Throws an error if useTheme is called outside of a ThemeProvider component.
 * Make sure your component is wrapped with ThemeProvider to use this hook.
 *
 * @returns {ThemeContextValue} An object containing:
 *   - theme: The current theme setting ('light', 'dark', or 'system')
 *   - resolvedTheme: The actual applied theme ('light' or 'dark')
 *   - setTheme: Function to update the theme setting
 *
 * @example
 * const { theme, resolvedTheme, setTheme } = useTheme();
 * setTheme('dark');
 */
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
