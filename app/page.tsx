import { Hero, SectionHeading } from '@/components/Header';
import { Albums, Biography, Collaborations, Legacy, Poetry, Videos } from '@/components/Sections';
import { MusicArchive } from '@/components/MusicArchive';
import { Gallery } from '@/components/Gallery';

function Section({
  id,
  index,
  title,
  sub,
  tint,
  children,
}: {
  id: string;
  index: string;
  title: string;
  sub?: string;
  tint?: boolean;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${tint ? 'bg-mist/60 dark:bg-white/[0.03]' : ''}`}>
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:py-20">
        <SectionHeading index={index} title={title} sub={sub} />
        {children}
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <Hero />

      <Section
        id="biography"
        index="01 — Biography"
        title="His life"
        sub="Six chapters, from a 600-year family tradition in Faisalabad to the world stage — and a timeline from 1948 to 2024."
        tint
      >
        <Biography />
      </Section>

      <Section
        id="music"
        index="02 — Music archive"
        title="The recordings"
        sub="Fourteen essential recordings. Search, filter by language and mood, save favourites, or let the archive surprise you. Play opens the official recording on YouTube."
      >
        <MusicArchive />
      </Section>

      <Section
        id="albums"
        index="03 — Albums"
        title="Landmark albums"
        sub="Ten albums that trace the arc — from Shahen-Shah in 1988 to the lost album Chain of Light, released in 2024."
        tint
      >
        <Albums />
      </Section>

      <Section
        id="gallery"
        index="04 — Gallery"
        title="Photographs"
        sub="Nine real archival photographs from Wikimedia Commons, with their credits. Tap any photograph to open it full-screen."
      >
        <Gallery />
      </Section>

      <Section
        id="videos"
        index="05 — Videos"
        title="Performances"
        sub="Historic live performances, the Afreen Afreen video, and the concerts that made him a world star."
        tint
      >
        <Videos />
      </Section>

      <Section
        id="collaborations"
        index="06 — Collaborations"
        title="Beyond qawwali"
        sub="Peter Gabriel, Michael Brook, Eddie Vedder, Javed Akhtar — the collaborations that carried his voice further than any qawwal before him."
      >
        <Collaborations />
      </Section>

      <Section
        id="poetry"
        index="07 — Poetry & heritage"
        title="The poetry"
        sub="The Sufi poetry behind the music — Bulleh Shah, Amir Khusro, Mirabai, and the lyricists he worked with."
        tint
      >
        <Poetry />
      </Section>

      <Section
        id="legacy"
        index="08 — Legacy"
        title="Honours & sources"
        sub="The record that still stands, and where every fact on this page can be checked."
      >
        <Legacy />
      </Section>

      <footer className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <p className="font-display text-3xl font-semibold leading-tight">
          Nusrat Fateh Ali Khan
          <br />
          <span className="italic text-accent">An immortal voice. A timeless legacy.</span>
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate2 dark:text-white/50">
          A fan-made legacy archive. Not affiliated with the Khan family, Real World Records, or any
          rights holder. Photographs are credited to their sources; no copyrighted audio is hosted —
          playback links to YouTube.
        </p>
        <p className="mt-4 font-mono text-[11px] uppercase tracking-widest text-slate2 dark:text-white/40">
          Built with Next.js · TypeScript · Tailwind CSS
        </p>
      </footer>
    </>
  );
}
