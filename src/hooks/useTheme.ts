'use client';

import { useCallback, useSyncExternalStore } from 'react';

export type Theme = 'dark' | 'light';

export const THEME_STORAGE_KEY = 'harla-theme';
const CLASS = 'light-mode';
const EVENT = 'harla-theme-change';

/**
 * Theme lives on <html class="light-mode"> so it can be applied before paint
 * by the inline script in the root layout (no dark flash for light-mode
 * visitors). Components subscribe through useSyncExternalStore so the server
 * render and the first client render agree ("dark"), then update.
 */
function readTheme(): Theme {
  if (typeof document === 'undefined') return 'dark';
  return document.documentElement.classList.contains(CLASS) ? 'light' : 'dark';
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle(CLASS, theme === 'light');
  root.style.colorScheme = theme;
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // storage unavailable (private mode) — theme still applies for this page
  }
  window.dispatchEvent(new Event(EVENT));
}

function subscribe(callback: () => void) {
  window.addEventListener(EVENT, callback);
  window.addEventListener('storage', callback);
  return () => {
    window.removeEventListener(EVENT, callback);
    window.removeEventListener('storage', callback);
  };
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'dark' as Theme);
  const toggleTheme = useCallback(() => {
    applyTheme(readTheme() === 'dark' ? 'light' : 'dark');
  }, []);
  return { theme, toggleTheme };
}

/** Inline in <head>: sets the class before first paint. Keep in sync with readTheme(). */
export const THEME_INIT_SCRIPT = `(function(){try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'){document.documentElement.classList.add('${CLASS}');}document.documentElement.style.colorScheme=t==='light'?'light':'dark';}catch(e){}})();`;
