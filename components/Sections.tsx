import { albums, biography, collaborations, honours, poetry, sources, timeline, videos, youtubeSearch } from '@/lib/data';
import { SectionHeading } from './Header';

export function Biography() {
  return (
    <div>
      <div className="grid gap-4 lg:grid-cols-2">
        {biography.map((b) => (
          <article key={b.chapter} className="rounded-3xl border border-line bg-white p-6 shadow-card sm:p-7 dark:border-nightLine dark:bg-nightCard">
            <p className="font-mono text-xs font-medium text-accent">{b.chapter}</p>
            <h3 className="mt-1 font-display text-2xl font-semibold">{b.title}</h3>
            <p className="mt-3 leading-relaxed text-slate2 dark:text-white/60">{b.text}</p>
          </article>
        ))}
      </div>

      <h3 className="mt-14 font-mono text-xs font-medium uppercase tracking-[0.22em] text-slate2 dark:text-white/40">
        Interactive timeline — 1948 to 2024
      </h3>
      <ol className="relative mt-6 space-y-4 border-l-2 border-accent/30 pl-6 sm:pl-8">
        {timeline.map((t) => (
          <li key={t.year} className="relative rounded-3xl border border-line bg-white p-5 shadow-card sm:p-6 dark:border-nightLine dark:bg-nightCard">
            <span className="absolute -left-[33px] top-6 h-3.5 w-3.5 rounded-full border-2 border-white bg-accent sm:-left-[41px] dark:border-night" aria-hidden="true" />
            <p className="font-display text-3xl font-semibold leading-none text-accent">{t.year}</p>
            <h4 className="mt-1.5 font-display text-xl font-semibold">{t.title}</h4>
            <p className="mt-1 max-w-3xl leading-relaxed text-slate2 dark:text-white/60">{t.text}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

export function Albums() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {albums.map((a) => (
        <article key={a.title} className="flex flex-col overflow-hidden rounded-3xl border border-line bg-white shadow-card transition hover:shadow-lift dark:border-nightLine dark:bg-nightCard">
          <div className="flex h-32 items-end p-5" style={{ background: `linear-gradient(135deg, ${a.color} 0%, ${a.color}cc 60%, ${a.color}99 100%)` }}>
            <p className="font-display text-2xl font-semibold leading-tight text-white">{a.title}</p>
          </div>
          <div className="flex flex-1 flex-col p-5">
            <p className="font-mono text-xs uppercase tracking-widest text-slate2 dark:text-white/50">
              {a.year} · {a.label}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate2 dark:text-white/60">{a.note}</p>
          </div>
        </article>
      ))}
    </div>
  );
}

export function Videos() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {videos.map((v) => (
        <article key={v.title} className="rounded-3xl border border-line bg-white p-6 shadow-card dark:border-nightLine dark:bg-nightCard">
          <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-accent">
            {v.category} · {v.year}
          </p>
          <h3 className="mt-2 font-display text-xl font-semibold">{v.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate2 dark:text-white/60">{v.note}</p>
          <a
            href={youtubeSearch(v.title)}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block rounded-full border border-line px-4 py-2 text-xs font-semibold transition hover:border-accent hover:text-accent dark:border-nightLine"
          >
            Watch on YouTube ↗
          </a>
        </article>
      ))}
      <p className="text-sm leading-relaxed text-slate2 sm:col-span-2 lg:col-span-3 dark:text-white/50">
        Videos are linked to YouTube search results for each performance — no video is re-hosted here,
        and no performance is presented as available when it is not.
      </p>
    </div>
  );
}

export function Collaborations() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {collaborations.map((c) => (
        <article key={c.name} className="rounded-3xl border border-line bg-white p-6 shadow-card dark:border-nightLine dark:bg-nightCard">
          <p className="font-mono text-xs uppercase tracking-widest text-slate2 dark:text-white/50">
            {c.role} · {c.years}
          </p>
          <h3 className="mt-1.5 font-display text-2xl font-semibold">{c.name}</h3>
          <p className="mt-2 leading-relaxed text-slate2 dark:text-white/60">{c.text}</p>
          <ul className="mt-4 space-y-1.5">
            {c.works.map((w) => (
              <li key={w} className="rounded-full bg-mist px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest dark:bg-white/10">
                {w}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

export function Poetry() {
  return (
    <div>
      <p className="max-w-3xl leading-relaxed text-slate2 dark:text-white/60">
        Qawwali is Sufi devotional music — poetry set to a voice that can hold a hall for hours.
        Traditional compositions are distinguished below from songs written by a named lyricist.
        Copyrighted lyrics are not reproduced here; listen via the official recordings.
      </p>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {poetry.map((p) => (
          <article key={p.title} className="rounded-3xl border border-line bg-white p-6 shadow-card dark:border-nightLine dark:bg-nightCard">
            <p className="font-mono text-[11px] font-medium uppercase tracking-widest text-accent">
              {p.poet} · {p.language} · {p.kind}
            </p>
            <h3 className="mt-2 font-display text-xl font-semibold">{p.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate2 dark:text-white/60">{p.text}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

export function Legacy() {
  return (
    <div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {honours.map((h) => (
          <article key={h.title} className="rounded-3xl border border-line bg-white p-6 shadow-card dark:border-nightLine dark:bg-nightCard">
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-accent">{h.year}</p>
            <h3 className="mt-1 font-display text-xl font-semibold">{h.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate2 dark:text-white/60">{h.body}</p>
          </article>
        ))}
        <article className="rounded-3xl bg-ink p-6 text-white shadow-card dark:bg-white dark:text-ink">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-teal2">The voice lives on</p>
          <h3 className="mt-1 font-display text-xl font-semibold">Rahat carries it forward</h3>
          <p className="mt-2 text-sm leading-relaxed opacity-80">
            Leadership of the family Qawwali party passed to his nephew, Rahat Fateh Ali Khan —
            and the recordings, from WOMAD 1985 to Chain of Light in 2024, keep finding new listeners.
          </p>
        </article>
      </div>

      <h3 className="mt-12 font-mono text-xs font-medium uppercase tracking-[0.22em] text-slate2 dark:text-white/40">Sources</h3>
      <ul className="mt-3 space-y-2">
        {sources.map((s) => (
          <li key={s.url}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm underline decoration-accent underline-offset-4 hover:text-accent"
            >
              {s.label} ↗
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm leading-relaxed text-slate2 dark:text-white/50">
        This is a fan-made legacy archive. It is not affiliated with the Khan family, Real World
        Records, or any rights holder. Photographs are credited to their sources; no copyrighted
        audio is hosted.
      </p>
    </div>
  );
}

export { SectionHeading };
