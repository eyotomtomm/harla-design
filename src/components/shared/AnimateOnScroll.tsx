'use client';

import { useRef, useEffect, useState, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: string;
  delay?: string;
  className?: string;
}

export default function AnimateOnScroll({
  children,
  animation = 'fadeInUp',
  delay = '',
  className = '',
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const classes = [
    className,
    visible && !reducedMotion ? `animated ${animation}` : '',
    !reducedMotion ? delay : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes}>
      {children}
    </div>
  );
}
