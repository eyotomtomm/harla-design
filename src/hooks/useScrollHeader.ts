'use client';

import { useState, useEffect } from 'react';

export function useScrollHeader(threshold: number = 100) {
  const [isFixed, setIsFixed] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    function handleScroll() {
      const pos = window.scrollY;
      setIsFixed(pos >= threshold);
      setShowScrollTop(pos >= threshold);
    }

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return { isFixed, showScrollTop };
}
