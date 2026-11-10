'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { tracks, youtubeSearch, type Track } from '@/lib/data';

interface PlayerState {
  current: Track | null;
  queue: Track[];
  favourites: string[];
  recent: string[];
  shuffle: boolean;
  repeat: boolean;
  play: (track: Track) => void;
  addToQueue: (track: Track) => void;
  removeFromQueue: (id: string) => void;
  next: () => void;
  prev: () => void;
  toggleFavourite: (id: string) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  clearQueue: () => void;
}

const PlayerContext = createContext<PlayerState | null>(null);

function readList(key: string): string[] {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [current, setCurrent] = useState<Track | null>(null);
  const [queue, setQueue] = useState<Track[]>([]);
  const [favourites, setFavourites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);

  useEffect(() => {
    setFavourites(readList('nfak-favourites'));
    setRecent(readList('nfak-recent'));
  }, []);

  useEffect(() => {
    localStorage.setItem('nfak-favourites', JSON.stringify(favourites));
  }, [favourites]);

  useEffect(() => {
    localStorage.setItem('nfak-recent', JSON.stringify(recent));
  }, [recent]);

  const play = useCallback((track: Track) => {
    setCurrent(track);
    setRecent((r) => [track.id, ...r.filter((id) => id !== track.id)].slice(0, 8));
    // No copyrighted audio is hosted here. Playback opens the official
    // recording on YouTube in a new tab.
    window.open(youtubeSearch(track.title), '_blank', 'noopener,noreferrer');
  }, []);

  const addToQueue = useCallback((track: Track) => {
    setQueue((q) => (q.some((t) => t.id === track.id) ? q : [...q, track]));
  }, []);

  const removeFromQueue = useCallback((id: string) => {
    setQueue((q) => q.filter((t) => t.id !== id));
  }, []);

  const clearQueue = useCallback(() => setQueue([]), []);

  const next = useCallback(() => {
    const list = queue.length > 0 ? queue : tracks;
    if (!current) {
      play(list[0]);
      return;
    }
    const i = list.findIndex((t) => t.id === current.id);
    const nxt = shuffle
      ? list[Math.floor(Math.random() * list.length)]
      : list[(i + 1) % list.length];
    play(nxt);
  }, [current, queue, shuffle, play]);

  const prev = useCallback(() => {
    const list = queue.length > 0 ? queue : tracks;
    if (!current) {
      play(list[0]);
      return;
    }
    const i = list.findIndex((t) => t.id === current.id);
    play(list[(i - 1 + list.length) % list.length]);
  }, [current, queue, play]);

  const toggleFavourite = useCallback((id: string) => {
    setFavourites((f) => (f.includes(id) ? f.filter((x) => x !== id) : [...f, id]));
  }, []);

  const value = useMemo<PlayerState>(
    () => ({
      current,
      queue,
      favourites,
      recent,
      shuffle,
      repeat,
      play,
      addToQueue,
      removeFromQueue,
      next,
      prev,
      toggleFavourite,
      toggleShuffle: () => setShuffle((s) => !s),
      toggleRepeat: () => setRepeat((r) => !r),
      clearQueue,
    }),
    [current, queue, favourites, recent, shuffle, repeat, play, addToQueue, removeFromQueue, next, prev, toggleFavourite, clearQueue],
  );

  return <PlayerContext.Provider value={value}>{children}</PlayerContext.Provider>;
}

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider');
  return ctx;
}
