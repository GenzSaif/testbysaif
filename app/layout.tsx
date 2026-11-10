import type { Metadata } from 'next';
import { PlayerProvider } from '@/components/player';
import { Header } from '@/components/Header';
import { ListeningDesk } from '@/components/ListeningDesk';
import './globals.css';

export const metadata: Metadata = {
  title: 'Nusrat Fateh Ali Khan — An Immortal Voice. A Timeless Legacy.',
  description:
    'The definitive digital legacy archive of Nusrat Fateh Ali Khan (1948–1997): biography, interactive timeline, music archive, albums, photographs, videos, collaborations and poetry.',
  openGraph: {
    title: 'Nusrat Fateh Ali Khan — An Immortal Voice. A Timeless Legacy.',
    description:
      'Biography, timeline, music archive, albums, photographs and collaborations of the Shahenshah-e-Qawwali.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="overflow-x-hidden">
        <PlayerProvider>
          <Header />
          <main className="pb-28">{children}</main>
          <ListeningDesk />
        </PlayerProvider>
      </body>
    </html>
  );
}
