'use client';

import { useScrollHeader } from '@/hooks/useScrollHeader';

export default function ScrollToTop() {
  const { showScrollTop } = useScrollHeader();

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      className="scroll-top scroll-to-target"
      onClick={handleClick}
      style={{ display: showScrollTop ? 'block' : 'none' }}
    >
      <span className="fas fa-angle-double-up"></span>
    </button>
  );
}
