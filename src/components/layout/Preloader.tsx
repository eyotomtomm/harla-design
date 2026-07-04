'use client';

import { useState, useEffect } from 'react';

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1200);
    const removeTimer = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="preloader"
      style={{ opacity: fadeOut ? 0 : 1, transition: 'opacity 0.5s ease' }}
    >
      <div className="preloader-inner">
        <img
          src="/images/logos/logo-dark.png"
          alt="Harla"
          className="preloader-logo"
        />
        <span className="preloader-text">HARLA</span>
        <div className="preloader-line">
          <div className="preloader-line-fill"></div>
        </div>
      </div>
    </div>
  );
}
