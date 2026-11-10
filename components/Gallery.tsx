'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { photos } from '@/lib/data';

export function Gallery() {
  const [category, setCategory] = useState('All');
  const [active, setActive] = useState<number | null>(null);

  const categories = ['All', ...Array.from(new Set(photos.map((p) => p.category)))];
  const shown = category === 'All' ? photos : photos.filter((p) => p.category === category);

  const step = useCallback(
    (dir: 1 | -1) => {
      setActive((a) => {
        if (a === null) return a;
        return (a + dir + shown.length) % shown.length;
      });
    },
    [shown.length],
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, step]);

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Filter photos by category">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            aria-pressed={category === c}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
              category === c
                ? 'bg-accent text-white shadow-sm'
                : 'border border-line bg-white text-slate2 hover:border-accent hover:text-accent dark:border-nightLine dark:bg-nightCard dark:text-white/60'
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-6 columns-2 gap-4 md:columns-3">
        {shown.map((p, i) => (
          <button
            key={p.src}
            onClick={() => setActive(i)}
            className="mb-4 block w-full break-inside-avoid overflow-hidden rounded-3xl border border-line bg-white text-left shadow-card transition hover:shadow-lift dark:border-nightLine dark:bg-nightCard"
            aria-label={`Open photograph: ${p.title}`}
          >
            <span className="relative block aspect-[4/3] w-full overflow-hidden">
              <Image src={p.src} alt={p.description} fill className="object-cover" sizes="(max-width: 768px) 50vw, 33vw" />
            </span>
            <span className="block px-4 pt-3 font-display text-lg font-semibold leading-snug">{p.title}</span>
            <span className="block px-4 pb-4 pt-1 font-mono text-[11px] uppercase tracking-widest text-slate2 dark:text-white/50">
              {p.category} · {p.credit}
            </span>
          </button>
        ))}
      </div>

      {active !== null && shown[active] && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-night/95 p-4 text-white"
          role="dialog"
          aria-modal="true"
          aria-label={`Photograph: ${shown[active].title}`}
          onClick={() => setActive(null)}
        >
          <div className="flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-widest">
              {shown[active].title} — {active + 1} / {shown.length}
            </p>
            <button
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold"
              onClick={() => setActive(null)}
            >
              Close ✕
            </button>
          </div>
          <div className="relative mt-4 min-h-0 flex-1" onClick={(e) => e.stopPropagation()}>
            <Image
              src={shown[active].src}
              alt={shown[active].description}
              fill
              className="rounded-2xl object-contain"
              sizes="100vw"
            />
          </div>
          <p className="mt-4 text-sm text-white/80">{shown[active].description}</p>
          <p className="font-mono text-[11px] uppercase tracking-widest text-white/60">
            {shown[active].credit}
          </p>
          <div className="mt-4 flex gap-2">
            <button
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
            >
              ← Previous
            </button>
            <button
              className="rounded-full border border-white/40 px-4 py-2 text-xs font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
            >
              Next →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
