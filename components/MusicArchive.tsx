'use client';

import { useMemo, useState } from 'react';
import { journeys, tracks, youtubeSearch, type Track } from '@/lib/data';
import { usePlayer } from './player';

const LANGUAGES = ['All', 'Urdu', 'Punjabi', 'Urdu / Punjabi'] as const;
const MOODS = ['All', 'Devotional', 'Love', 'Ecstasy', 'Longing'] as const;

function chip(active: boolean) {
  return `rounded-full px-3.5 py-1.5 text-xs font-medium transition ${
    active
      ? 'bg-accent text-white shadow-sm'
      : 'border border-line bg-white text-slate2 hover:border-accent hover:text-accent dark:border-nightLine dark:bg-nightCard dark:text-white/60 dark:hover:border-accent'
  }`;
}

function TrackRow({ track, index }: { track: Track; index: number }) {
  const { play, addToQueue, toggleFavourite, favourites } = usePlayer();
  const fav = favourites.includes(track.id);
  return (
    <li className="flex flex-col gap-3 rounded-2xl border border-line bg-white p-4 shadow-card transition hover:shadow-lift sm:flex-row sm:items-center dark:border-nightLine dark:bg-nightCard">
      <span className="hidden font-mono text-sm text-slate2 sm:block dark:text-white/40">
        {String(index + 1).padStart(2, '0')}
      </span>
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold text-white"
        style={{ backgroundColor: track.color }}
        aria-hidden="true"
      >
        ♪
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-display text-lg font-semibold leading-snug">{track.title}</p>
        <p className="truncate text-sm text-slate2 dark:text-white/50">
          {track.album} · {track.year} · {track.language} · {track.mood}
        </p>
        <p className="mt-0.5 text-sm text-slate2 dark:text-white/50">{track.note}</p>
      </div>
      <div className="flex shrink-0 items-center gap-2">
        <button
          onClick={() => play(track)}
          className="rounded-full bg-ink px-4 py-2 text-xs font-semibold text-white transition hover:bg-accent dark:bg-white dark:text-ink dark:hover:bg-accent dark:hover:text-white"
          aria-label={`Play ${track.title} on YouTube`}
        >
          ▶ Play
        </button>
        <button
          onClick={() => addToQueue(track)}
          className="rounded-full border border-line px-3 py-2 text-xs font-semibold dark:border-nightLine"
          aria-label={`Add ${track.title} to queue`}
        >
          + Queue
        </button>
        <button
          onClick={() => toggleFavourite(track.id)}
          className="rounded-full border border-line px-3 py-2 text-sm dark:border-nightLine"
          aria-label={fav ? `Remove ${track.title} from favourites` : `Add ${track.title} to favourites`}
        >
          {fav ? '♥' : '♡'}
        </button>
      </div>
    </li>
  );
}

export function MusicArchive() {
  const { favourites, recent } = usePlayer();
  const [query, setQuery] = useState('');
  const [language, setLanguage] = useState<string>('All');
  const [mood, setMood] = useState<string>('All');
  const [onlyFavourites, setOnlyFavourites] = useState(false);
  const [random, setRandom] = useState<Track | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tracks.filter((t) => {
      if (language !== 'All' && t.language !== language) return false;
      if (mood !== 'All' && t.mood !== mood) return false;
      if (onlyFavourites && !favourites.includes(t.id)) return false;
      if (q && !`${t.title} ${t.album} ${t.note}`.toLowerCase().includes(q)) return false;
      return true;
    });
  }, [query, language, mood, onlyFavourites, favourites]);

  const recentTracks = tracks.filter((t) => recent.includes(t.id));

  const discover = () => {
    const pool = filtered.length > 0 ? filtered : tracks;
    setRandom(pool[Math.floor(Math.random() * pool.length)]);
  };

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search the archive — try “Afreen” or “Allah”"
          aria-label="Search tracks"
          className="min-w-0 flex-1 rounded-full border border-line bg-white px-5 py-3 text-sm shadow-sm outline-none placeholder:text-slate2 focus:border-accent focus:ring-2 focus:ring-accent/20 dark:border-nightLine dark:bg-nightCard"
        />
        <button
          onClick={discover}
          className="rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
        >
          Discover a Qawwali →
        </button>
        <button
          onClick={() => setOnlyFavourites((v) => !v)}
          aria-pressed={onlyFavourites}
          className={`rounded-full px-5 py-3 text-sm font-semibold ${
            onlyFavourites ? 'bg-accent text-white' : 'border border-line bg-white shadow-sm dark:border-nightLine dark:bg-nightCard'
          }`}
        >
          ♥ Favourites ({favourites.length})
        </button>
      </div>

      <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Filter by language">
        {LANGUAGES.map((l) => (
          <button key={l} onClick={() => setLanguage(l)} aria-pressed={language === l} className={chip(language === l)}>
            {l}
          </button>
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Filter by mood">
        {MOODS.map((m) => (
          <button key={m} onClick={() => setMood(m)} aria-pressed={mood === m} className={chip(mood === m)}>
            {m}
          </button>
        ))}
      </div>

      {random && (
        <div className="mt-6 rounded-3xl border border-accent/30 bg-accentSoft p-6 dark:bg-accent/15">
          <p className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-accent">Random discovery</p>
          <p className="mt-2 font-display text-2xl font-semibold">{random.title}</p>
          <p className="mt-1 text-sm text-slate2 dark:text-white/60">{random.note}</p>
          <a
            href={youtubeSearch(random.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-white dark:bg-white dark:text-ink"
          >
            Listen on YouTube ↗
          </a>
        </div>
      )}

      <ul className="mt-6 space-y-3">
        {filtered.map((t, i) => (
          <TrackRow key={t.id} track={t} index={i} />
        ))}
      </ul>
      {filtered.length === 0 && (
        <p className="mt-6 rounded-3xl border border-line bg-white p-6 text-center text-slate2 dark:border-nightLine dark:bg-nightCard">
          Nothing in the archive matches that search. Try another word — or clear the filters.
        </p>
      )}
      <p className="mt-4 font-mono text-xs uppercase tracking-widest text-slate2 dark:text-white/40">
        {filtered.length} of {tracks.length} recordings · Play opens the official recording on YouTube — no audio is hosted here.
      </p>

      {recentTracks.length > 0 && (
        <div className="mt-8">
          <h3 className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-slate2 dark:text-white/40">Recently played</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {recentTracks.map((t) => (
              <li key={t.id} className="rounded-full border border-line bg-white px-3.5 py-1.5 text-sm shadow-sm dark:border-nightLine dark:bg-nightCard">
                {t.title}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-10">
        <h3 className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-slate2 dark:text-white/40">Curated listening journeys</h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {journeys.map((j) => (
            <article key={j.id} className="rounded-3xl border border-line bg-white p-6 shadow-card dark:border-nightLine dark:bg-nightCard">
              <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-accent">{j.minutes}</p>
              <h4 className="mt-2 font-display text-xl font-semibold">{j.title}</h4>
              <p className="mt-2 text-sm leading-relaxed text-slate2 dark:text-white/60">{j.text}</p>
              <p className="mt-3 text-sm font-medium">
                {j.trackIds.map((id) => tracks.find((t) => t.id === id)?.title).join(' → ')}
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
