'use client';

import { useState } from 'react';
import { usePlayer } from './player';

export function ListeningDesk() {
  const { current, queue, next, prev, shuffle, repeat, toggleShuffle, toggleRepeat, removeFromQueue, clearQueue } =
    usePlayer();
  const [showQueue, setShowQueue] = useState(false);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 sm:px-6 sm:pb-4">
      <div className="mx-auto max-w-3xl rounded-3xl border border-line bg-white/95 shadow-lift backdrop-blur-xl dark:border-nightLine dark:bg-nightCard/95">
        <div className="flex items-center gap-3 px-4 py-3 sm:px-5">
          <div className="min-w-0 flex-1">
            {current ? (
              <>
                <p className="truncate font-display text-base font-semibold leading-tight sm:text-lg">
                  {current.title}
                </p>
                <p className="truncate text-xs text-slate2 dark:text-white/50">
                  {current.album} · {current.year} · Listening Desk — plays on YouTube
                </p>
              </>
            ) : (
              <>
                <p className="font-display text-base font-semibold leading-tight sm:text-lg">Listening Desk</p>
                <p className="text-xs text-slate2 dark:text-white/50">Pick a track above — it opens on YouTube in a new tab.</p>
              </>
            )}
          </div>
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={toggleShuffle}
              aria-pressed={shuffle}
              aria-label="Toggle shuffle"
              className={`rounded-full px-3 py-2 text-xs font-semibold ${shuffle ? 'bg-accent text-white' : 'bg-mist text-ink dark:bg-white/10 dark:text-white'}`}
            >
              Shuffle
            </button>
            <button onClick={prev} aria-label="Previous track" className="rounded-full bg-mist px-3 py-2 text-xs font-semibold dark:bg-white/10 dark:text-white">
              |◀
            </button>
            <button
              onClick={next}
              aria-label="Next track"
              className="rounded-full bg-accent px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              ▶ Next
            </button>
            <button
              onClick={toggleRepeat}
              aria-pressed={repeat}
              aria-label="Toggle repeat"
              className={`rounded-full px-3 py-2 text-xs font-semibold ${repeat ? 'bg-accent text-white' : 'bg-mist text-ink dark:bg-white/10 dark:text-white'}`}
            >
              Repeat
            </button>
            <button
              onClick={() => setShowQueue((v) => !v)}
              aria-expanded={showQueue}
              className="rounded-full bg-mist px-3 py-2 text-xs font-semibold dark:bg-white/10 dark:text-white"
            >
              Queue ({queue.length})
            </button>
          </div>
        </div>
        {showQueue && (
          <div className="border-t border-line px-4 py-3 sm:px-5 dark:border-nightLine">
            {queue.length === 0 ? (
              <p className="text-sm text-slate2 dark:text-white/50">
                Your queue is empty. Use “+ Queue” on any track in the music archive to build one.
              </p>
            ) : (
              <>
                <ul className="space-y-1.5">
                  {queue.map((t) => (
                    <li key={t.id} className="flex items-center justify-between gap-2 text-sm">
                      <span>
                        {t.title} <span className="text-slate2 dark:text-white/50">· {t.album}</span>
                      </span>
                      <button
                        onClick={() => removeFromQueue(t.id)}
                        className="text-xs font-semibold uppercase tracking-widest text-accent"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={clearQueue}
                  className="mt-2 text-xs font-semibold uppercase tracking-widest text-slate2 underline dark:text-white/50"
                >
                  Clear queue
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
