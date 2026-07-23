import React, { useEffect, useState } from 'react';
import { ThemeContext } from './ThemeContext';
import type { Theme } from './ThemeContext';

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');

  // Here we Initialize theme on mount
  useEffect(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    if (stored) {
      setThemeState(stored);
    }
  }, []);

  // Here we Apply theme
  useEffect(() => {
    const root = document.documentElement;

    const systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const finalTheme = theme === 'system' ? (systemDark ? 'dark' : 'light') : theme;

    setResolvedTheme(finalTheme);

    root.classList.remove('light', 'dark');
    root.classList.add(finalTheme);

    localStorage.setItem('theme', theme);
  }, [theme]);

  // Here we Listen to system changes(System preference detection)
  useEffect(() => {
    if (theme !== 'system') return;

    const media = window.matchMedia('(prefers-color-scheme: dark)');

    const listener = () => {
      const root = document.documentElement;
      const newTheme = media.matches ? 'dark' : 'light';
      setResolvedTheme(newTheme);
      root.classList.remove('light', 'dark');
      root.classList.add(newTheme);
    };

    media.addEventListener('change', listener);
    return () => {
      media.removeEventListener('change', listener);
    };
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
