'use client';

import { useTheme } from '@/hooks/useTheme';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-toggle">
      <span className="theme-icon" onClick={toggleTheme} style={{ cursor: 'pointer' }}>
        <i className={`far ${theme === 'dark' ? 'fa-moon' : 'fa-sun'}`}></i>
      </span>
    </div>
  );
}
