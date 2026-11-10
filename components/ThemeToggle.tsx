'use client';

import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('nfak-theme');
    const isDark = saved === 'dark';
    setDark(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggle = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('nfak-theme', next ? 'dark' : 'light');
  };

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}
      className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold tracking-wide text-ink shadow-sm transition hover:border-accent hover:text-accent dark:border-nightLine dark:bg-nightCard dark:text-white dark:hover:border-accent"
    >
      {dark ? '☀ Light' : '◐ Dark'}
    </button>
  );
}
