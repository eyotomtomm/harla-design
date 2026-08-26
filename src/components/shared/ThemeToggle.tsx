'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';

  return (
    <div className="theme-toggle">
      <button
        type="button"
        className="theme-icon"
        onClick={toggleTheme}
        aria-label={`Switch to ${next} mode`}
        title={`Switch to ${next} mode`}
      >
        <i className={`far ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`} aria-hidden="true"></i>
      </button>
    </div>
  );
}
