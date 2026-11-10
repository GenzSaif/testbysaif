'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { artist, stats } from '@/lib/data';

const NAV = [
  { href: '#biography', label: 'Biography' },
  { href: '#music', label: 'Music' },
  { href: '#albums', label: 'Albums' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#videos', label: 'Videos' },
  { href: '#collaborations', label: 'Collaborations' },
  { href: '#poetry', label: 'Poetry' },
  { href: '#legacy', label: 'Legacy' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-ivory/85 backdrop-blur-xl dark:border-nightLine dark:bg-night/85">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-baseline gap-2.5">
          <span className="font-display text-xl font-semibold italic leading-none">
            Nusrat
          </span>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.22em] text-slate2 sm:inline dark:text-white/50">
            Fateh Ali Khan · 1948–1997
          </span>
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-1.5 text-[13px] font-medium text-slate2 transition hover:bg-mist hover:text-ink dark:text-white/60 dark:hover:bg-nightCard dark:hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            className="rounded-full border border-line bg-white px-3.5 py-1.5 text-xs font-semibold shadow-sm lg:hidden dark:border-nightLine dark:bg-nightCard dark:text-white"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-label="Toggle navigation menu"
          >
            Menu
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line px-4 py-3 lg:hidden dark:border-nightLine" aria-label="Mobile navigation">
          <div className="flex flex-wrap gap-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-full border border-line bg-white px-3.5 py-2 text-xs font-medium dark:border-nightLine dark:bg-nightCard"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[-10%] h-96 w-96 rounded-full bg-accent/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-5%] h-72 w-72 rounded-full bg-teal2/15 blur-3xl"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:items-center lg:py-20">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-accentSoft px-3.5 py-1.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-accent dark:bg-accent/20 dark:text-indigo-300">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            The Definitive Digital Legacy Archive
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight">
            Nusrat Fateh
            <br />
            Ali <em className="text-accent">Khan</em>
          </h1>
          <p className="mt-4 font-display text-xl italic text-slate2 sm:text-2xl dark:text-white/60" lang="ur" dir="rtl">
            {artist.urdu}
          </p>
          <p className="mt-5 max-w-xl text-lg leading-relaxed">{artist.tagline}</p>
          <p className="mt-3 max-w-xl leading-relaxed text-slate2 dark:text-white/60">{artist.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#music"
              className="rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-lift transition hover:bg-indigo-700"
            >
              Explore his music →
            </a>
            <a
              href="#biography"
              className="rounded-full border border-line bg-white px-6 py-3 text-sm font-semibold shadow-sm transition hover:border-accent hover:text-accent dark:border-nightLine dark:bg-nightCard dark:hover:border-accent"
            >
              Read his life
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-line bg-white p-4 shadow-card dark:border-nightLine dark:bg-nightCard"
              >
                <dt className="font-display text-2xl font-semibold text-accent">{s.value}</dt>
                <dd className="mt-1 text-[11px] leading-snug text-slate2 dark:text-white/50">{s.label}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src="/photos/portrait.jpg"
              alt="Portrait of Nusrat Fateh Ali Khan"
              width={800}
              height={1000}
              priority
              className="aspect-[4/5] w-full object-cover object-top"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
          <p className="absolute bottom-4 left-4 rounded-full bg-night/80 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur">
            Portrait · Thomas Rome, CC BY 2.0, via Wikimedia Commons
          </p>
        </div>
      </div>
    </section>
  );
}

export function SectionHeading({
  index,
  title,
  sub,
}: {
  index: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-10 max-w-3xl">
      <p className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-accent">{index}</p>
      <h2 className="mt-2 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-3 leading-relaxed text-slate2 dark:text-white/60">{sub}</p>}
    </div>
  );
}
