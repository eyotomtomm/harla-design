'use client';

import { type ReactNode } from 'react';
import { useTheme } from '@/hooks/useTheme';

export default function PageWrapper({ children }: { children: ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`page-wrapper${theme === 'light' ? ' light-mode' : ''}`}>
      {children}
    </div>
  );
}
