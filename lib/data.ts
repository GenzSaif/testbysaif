// ---------------------------------------------------------------------------
// NUSRAT FATEH ALI KHAN — LEGACY ARCHIVE DATA
// ---------------------------------------------------------------------------
// Every dated fact here is drawn from published sources listed in `sources`
// (Britannica, Real World Records, Encyclopedia.com, Wikipedia, Dawn).
// Nothing is invented: where a date or detail could not be verified it is
// left out or marked "Traditional". No copyrighted audio is hosted —
// playback links go to YouTube, where the official recordings live.
// Photographs are real published images from Wikimedia Commons, bundled
// locally in /public/photos with their credits in `photos`.
// ---------------------------------------------------------------------------

export type Language = 'Urdu' | 'Punjabi' | 'Persian' | 'Urdu / Punjabi';

export interface TimelineEntry {
  year: number;
  title: string;
  text: string;
}

export interface Track {
  id: string;
  title: string;
  album: string;
  year: string;
  language: Language;
  mood: 'Devotional' | 'Love' | 'Ecstasy' | 'Longing';
  note: string;
  color: string;
}

export interface Album {
  title: string;
  year: string;
  label: string;
  note: string;
  color: string;
}

export interface Photo {
  src: string;
  title: string;
  year: string;
  category: string;
  credit: string;
  description: string;
}

export interface Collaboration {
  name: string;
  role: string;
  years: string;
  text: string;
  works: string[];
}

export interface Poem {
  title: string;
  poet: string;
  language: Language;
  kind: 'Traditional' | 'Lyricist';
  text: string;
}

export const artist = {
  name: 'Nusrat Fateh Ali Khan',
  urdu: 'نصرت فتح علی خان',
  tagline: 'An immortal voice. A timeless legacy.',
  born: '13 October 1948 — Lyallpur (now Faisalabad), Punjab, Pakistan',
  died: '16 August 1997 — London, England, aged 48',
  intro:
    'Pakistani singer of qawwali — the devotional music of the Sufis — and one of the greatest voices ever recorded. From a family with a 600-year qawwali tradition, he carried the music from shrine courtyards to concert halls on five continents, recorded 125 albums, and gave the world Afreen Afreen, Allah Hoo and Dam Mast Qalandar.',
};

export const stats = [
  { value: '125', label: 'Albums recorded — Guinness World Records' },
  { value: '600', label: 'Years of family qawwali tradition' },
  { value: '1985', label: 'WOMAD debut that introduced him to the West' },
  { value: '40+', label: 'Countries toured' },
];

export const biography: { chapter: string; title: string; text: string }[] = [
  {
    chapter: '01',
    title: 'Roots',
    text: 'Nusrat Fateh Ali Khan was born Pervez Fateh Ali Khan on 13 October 1948 in Lyallpur — now Faisalabad — in Punjab, Pakistan, into a Punjabi Muslim family that had performed qawwali for some 600 years. His father was the revered qawwal Ustad Fateh Ali Khan. Music was not a career choice in that house; it was the family inheritance.',
  },
  {
    chapter: '02',
    title: 'Training',
    text: 'He was trained in qawwali from childhood by his father, learning the classical discipline behind the ecstasy — the long, unhurried build of a mehfil, the call-and-response with the chorus, the voice that could hold a single note until a hall went silent. He gave his first public performance at the age of 15, at his father’s chelum, in 1964.',
  },
  {
    chapter: '03',
    title: 'Leading the Party',
    text: 'In 1971, after his father’s death, Nusrat took over leadership of the family Qawwali party. For the next 26 years he led the ensemble — harmonium, tabla, chorus and clapping hands — through Pakistan and India, and then, step by step, around the world.',
  },
  {
    chapter: '04',
    title: 'The World Stage',
    text: 'His breakthrough beyond South Asia came in the summer of 1985, when he performed at Peter Gabriel’s WOMAD festival in England. He played Paris in 1985 and 1988, and toured Japan in 1987 at the invitation of the Japan Foundation. In Tokyo he was hailed as the singing Buddha; in Paris, the Pavarotti of the East.',
  },
  {
    chapter: '05',
    title: 'Collaborations & Film',
    text: 'Gabriel signed him to Real World Records. With Canadian guitarist Michael Brook he made Mustt Mustt (1990) and the Grammy-nominated Night Song (1996). He sang on Gabriel’s soundtrack to The Last Temptation of Christ (1988) and contributed to the Dead Man Walking soundtrack with Eddie Vedder (1995). With lyricist Javed Akhtar he made Sangam — and Afreen Afreen (1996).',
  },
  {
    chapter: '06',
    title: 'Final Years & Legacy',
    text: 'He died of a sudden cardiac arrest at Cromwell Hospital, London, on 16 August 1997, aged 48, after travelling there for treatment for liver and kidney problems. The Guinness Book of World Records lists 125 albums — the largest recorded output by a qawwali artist. In 2024, Real World released Chain of Light, four unheard recordings from 1990, restored from the original tapes. His nephew Rahat Fateh Ali Khan carries the party on.',
  },
];

export const timeline: TimelineEntry[] = [
  { year: 1948, title: 'Born in Lyallpur', text: 'Born Pervez Fateh Ali Khan on 13 October 1948 in Lyallpur (now Faisalabad), Punjab, Pakistan, son of Ustad Fateh Ali Khan, into a family with a 600-year qawwali tradition.' },
  { year: 1964, title: 'First public performance', text: 'Sings in public for the first time, aged 15, at his father’s chelum.' },
  { year: 1971, title: 'Leads the family party', text: 'Takes over leadership of the family Qawwali party after his father’s death — a position he holds for the rest of his life.' },
  { year: 1985, title: 'WOMAD — the world hears him', text: 'Performs at the World of Music, Arts and Dance (WOMAD) festival in England, co-founded by Peter Gabriel. Plays Paris the same year.' },
  { year: 1987, title: 'Royal Albert Hall & Japan', text: 'Performs at the Royal Albert Hall, London, and tours Japan at the invitation of the Japan Foundation, where he is hailed as the singing Buddha.' },
  { year: 1988, title: 'The Last Temptation of Christ', text: 'Sings on Peter Gabriel’s soundtrack to Martin Scorsese’s film and is signed to Gabriel’s Real World Records. Shahen-Shah is released.' },
  { year: 1990, title: 'Mustt Mustt', text: 'Mustt Mustt, his collaboration with Michael Brook, is released on Real World. On 29 April 1990 he records the sessions later released as Chain of Light.' },
  { year: 1992, title: 'Allah Hoo', text: 'Allah Hoo is released and becomes an instant classic; Devotional Songs appears on Real World.' },
  { year: 1994, title: 'The Last Prophet', text: 'The Last Prophet is released on Real World Records.' },
  { year: 1995, title: 'Dead Man Walking', text: 'Contributes to the soundtrack of Dead Man Walking, working with Eddie Vedder of Pearl Jam.' },
  { year: 1996, title: 'Night Song & Afreen Afreen', text: 'Night Song with Michael Brook is released and earns a Grammy nomination. Sangam, with lyricist Javed Akhtar, gives the world Afreen Afreen.' },
  { year: 1997, title: 'Death in London', text: 'Dies of a sudden cardiac arrest at Cromwell Hospital, London, on 16 August 1997, aged 48.' },
  { year: 2001, title: 'Guinness World Record', text: 'The Guinness Book of World Records lists 125 albums — the largest recorded output by a qawwali artist.' },
  { year: 2015, title: 'Google Doodle', text: 'Google honours his 67th birthday with a Doodle on 13 October 2015.' },
  { year: 2024, title: 'Chain of Light', text: 'Real World Records releases Chain of Light — four previously unheard recordings from 29 April 1990, restored from the original analogue tapes, including Ya Allah Ya Rehman.' },
];

const yt = (q: string) =>
  `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;

export const tracks: Track[] = [
  { id: 'allah-hoo', title: 'Allah Hoo', album: 'Devotional Songs', year: '1992', language: 'Urdu', mood: 'Devotional', note: 'The great devotional call — released in 1992 and an instant classic.', color: '#E63B2E' },
  { id: 'afreen', title: 'Afreen Afreen', album: 'Sangam', year: '1996', language: 'Urdu', mood: 'Love', note: 'Lyrics by Javed Akhtar. His single most famous song; the video starred Lisa Ray.', color: '#161513' },
  { id: 'dam-mast', title: 'Dam Mast Qalandar', album: 'Traditional', year: 'Traditional', language: 'Punjabi', mood: 'Ecstasy', note: 'Tribute to the Sufi saint Lal Shahbaz Qalandar; later remixed with Bally Sagoo.', color: '#F2A900' },
  { id: 'dillagi', title: 'Tumhe Dillagi Bhool Jani Padegi', album: 'Traditional', year: 'Traditional', language: 'Urdu', mood: 'Longing', note: 'Lyrics by Purnam Allahabadi. One of his most famous qawwalis.', color: '#2E5E4E' },
  { id: 'piya', title: 'Mera Piya Ghar Aaya', album: 'Traditional', year: 'Traditional', language: 'Punjabi', mood: 'Ecstasy', note: 'Words of the Punjabi Sufi poet Bulleh Shah. A complete performance can run 17 minutes.', color: '#7C3AED' },
  { id: 'suroor', title: 'Yeh Jo Halka Halka Suroor Hai', album: 'Traditional', year: 'Traditional', language: 'Urdu', mood: 'Love', note: 'A gentle, intoxicating love qawwali — one of his most requested songs.', color: '#0E7490' },
  { id: 'sanson', title: 'Sanson Ki Mala Pe', album: 'Traditional', year: 'Traditional', language: 'Urdu / Punjabi', mood: 'Devotional', note: 'A devotional classic in the Mirabai tradition, sung as a slow, prayerful build.', color: '#B45309' },
  { id: 'nit-khair', title: 'Nit Khair Manga', album: 'Traditional', year: 'Traditional', language: 'Punjabi', mood: 'Devotional', note: 'A prayer for wellbeing, sung in Punjabi — a staple of the live mehfil.', color: '#BE123C' },
  { id: 'mustt', title: 'Mustt Mustt', album: 'Mustt Mustt', year: '1990', language: 'Urdu', mood: 'Ecstasy', note: 'Title track of the Michael Brook collaboration that introduced qawwali to the West.', color: '#E63B2E' },
  { id: 'sweet-pain', title: 'Sweet Pain', album: 'Night Song', year: '1996', language: 'Urdu', mood: 'Longing', note: 'From the Grammy-nominated Night Song with Michael Brook.', color: '#161513' },
  { id: 'ya-allah', title: 'Ya Allah Ya Rehman', album: 'Chain of Light', year: '2024', language: 'Urdu', mood: 'Devotional', note: 'Recorded 29 April 1990 at Real World Studios; released on Chain of Light in 2024.', color: '#2E5E4E' },
  { id: 'ya-gaus', title: 'Ya Gaus Ya Meeran', album: 'Chain of Light', year: '2024', language: 'Urdu', mood: 'Devotional', note: 'The only known performance of this qawwal, from the Chain of Light sessions.', color: '#0E7490' },
  { id: 'kinna-sohna', title: 'Kinna Sohna Tenu', album: 'Traditional', year: 'Traditional', language: 'Punjabi', mood: 'Love', note: 'A beloved Punjabi love song, sung at mehfils for decades.', color: '#F2A900' },
  { id: 'gorakh', title: 'Tum Ek Gorakh Dhandha Ho', album: 'Traditional', year: 'Traditional', language: 'Urdu', mood: 'Devotional', note: 'A philosophical qawwali on the mystery of the divine.', color: '#7C3AED' },
];

export const youtubeSearch = (title: string) =>
  yt(`Nusrat Fateh Ali Khan ${title}`);

export const albums: Album[] = [
  { title: 'Shahen-Shah', year: '1988', label: 'Real World', note: 'His first Real World release — traditional qawwali, recorded for the world stage.', color: '#161513' },
  { title: 'Mustt Mustt', year: '1990', label: 'Real World', note: 'With Michael Brook. The fusion record that made qawwali a global sound.', color: '#E63B2E' },
  { title: 'Magic Touch', year: '1991', label: 'OSA', note: 'A much-loved early-90s studio album from the Oriental Star Agencies years.', color: '#F2A900' },
  { title: 'Shahbaaz', year: '1991', label: 'Real World', note: 'Traditional qawwali for Real World, named for the falcon of the Sufis.', color: '#2E5E4E' },
  { title: 'Devotional Songs', year: '1992', label: 'Real World', note: 'Devotional qawwalis, including Allah Hoo.', color: '#0E7490' },
  { title: 'The Last Prophet', year: '1994', label: 'Real World', note: 'Traditional qawwali, recorded for Real World Records.', color: '#7C3AED' },
  { title: 'Sangam', year: '1996', label: '—', note: 'With lyricist Javed Akhtar. Home of Afreen Afreen.', color: '#BE123C' },
  { title: 'Night Song', year: '1996', label: 'Real World', note: 'With Michael Brook. Grammy-nominated; Billboard called it “an album for the ages”.', color: '#161513' },
  { title: 'Live at WOMAD 1985', year: 'Recorded 1985', label: 'Real World', note: 'The performance that introduced him to the West, preserved live.', color: '#B45309' },
  { title: 'Chain of Light', year: '2024', label: 'Real World', note: 'Four unheard recordings from 29 April 1990, restored from the original tapes.', color: '#E63B2E' },
];

export const photos: Photo[] = [
  { src: '/photos/portrait.jpg', title: 'Portrait', year: '—', category: 'Portraits', credit: 'Thomas Rome, CC BY 2.0, via Wikimedia Commons', description: 'The classic portrait used across the world’s obituaries and tributes.' },
  { src: '/photos/concert.jpg', title: 'In concert', year: '—', category: 'Concerts', credit: 'Wikimedia Commons', description: 'Nusrat on stage, harmonium before him, lost in the music.' },
  { src: '/photos/burki.png', title: 'With the party', year: '—', category: 'Concerts', credit: 'Wikimedia Commons', description: 'Nusrat with his qawwal party — chorus, tabla and harmonium.' },
  { src: '/photos/sabri-1.jpg', title: 'With Ghulam Farid Sabri', year: '—', category: 'With friends', credit: 'Wikimedia Commons', description: 'Two giants of qawwali together: Nusrat and Ghulam Farid Sabri.' },
  { src: '/photos/sabri-2.jpg', title: 'Sabri & Nusrat', year: '—', category: 'With friends', credit: 'Wikimedia Commons', description: 'Nusrat Fateh Ali Khan with Ghulam Farid Sabri.' },
  { src: '/photos/sabri-3.jpg', title: 'The two masters', year: '—', category: 'With friends', credit: 'Wikimedia Commons', description: 'Nusrat and Ghulam Farid Sabri, photographed together.' },
  { src: '/photos/sabri-4.jpg', title: 'Qawwali masters', year: '—', category: 'With friends', credit: 'Wikimedia Commons', description: 'Nusrat Fateh Ali Khan with Ghulam Farid Sabri.' },
  { src: '/photos/studio.jpg', title: 'Studio portrait', year: '—', category: 'Portraits', credit: 'Vishal Singh Rana, via Wikimedia Commons', description: 'A studio portrait of the maestro.' },
  { src: '/photos/faisalabad.jpg', title: 'Arts Council, Faisalabad', year: '—', category: 'Early life', credit: 'Wikimedia Commons', description: 'Nusrat at the Arts Council in Faisalabad, his home city.' },
];

export const collaborations: Collaboration[] = [
  { name: 'Peter Gabriel', role: 'WOMAD founder · Real World Records', years: '1985–1997', text: 'Gabriel invited Nusrat to WOMAD in 1985, signed him to Real World Records, and featured him on the soundtrack of The Last Temptation of Christ (1988).', works: ['WOMAD 1985', 'The Last Temptation of Christ (1988)', 'Real World Records'] },
  { name: 'Michael Brook', role: 'Guitarist · producer', years: '1990–1996', text: 'The Canadian guitarist and producer made two landmark fusion albums with Nusrat — Mustt Mustt and the Grammy-nominated Night Song — and produced the Chain of Light restoration.', works: ['Mustt Mustt (1990)', 'Night Song (1996)', 'Chain of Light (2024)'] },
  { name: 'Eddie Vedder', role: 'Pearl Jam', years: '1995', text: 'Nusrat contributed to the soundtrack of Dead Man Walking (1995), working with Pearl Jam’s Eddie Vedder.', works: ['Dead Man Walking soundtrack (1995)'] },
  { name: 'Javed Akhtar', role: 'Lyricist', years: '1996', text: 'The Indian lyricist wrote Afreen Afreen for Sangam (1996) — Nusrat’s most famous song, and their first collaboration.', works: ['Sangam (1996)', 'Afreen Afreen'] },
  { name: 'Bally Sagoo', role: 'Producer · remixer', years: '1990s', text: 'The British-Asian producer’s remix of Dam Mast Qalandar took Nusrat’s voice onto UK dancefloors.', works: ['Dam Mast Qalandar (remix)'] },
  { name: 'Massive Attack', role: 'Remixers', years: '1990', text: 'Massive Attack remixed the title track of Mustt Mustt, bridging qawwali and trip-hop.', works: ['Mustt Mustt (Massive Attack remix)'] },
];

export const poetry: Poem[] = [
  { title: 'Mera Piya Ghar Aaya', poet: 'Bulleh Shah', language: 'Punjabi', kind: 'Traditional', text: 'Words of the 18th-century Punjabi Sufi poet Bulleh Shah — the beloved has come home, and the house is lit with joy.' },
  { title: 'Afreen Afreen', poet: 'Javed Akhtar', language: 'Urdu', kind: 'Lyricist', text: 'A modern ghazal of praise for a beautiful face — written by Javed Akhtar for Sangam (1996). The full lyrics are copyrighted; listen via the official recording.' },
  { title: 'Tumhe Dillagi Bhool Jani Padegi', poet: 'Purnam Allahabadi', language: 'Urdu', kind: 'Traditional', text: 'Purnam Allahabadi’s famous plea — you will have to forget this dalliance, for love does not let go so easily.' },
  { title: 'Sanson Ki Mala Pe', poet: 'Mirabai (tradition)', language: 'Urdu / Punjabi', kind: 'Traditional', text: 'In the tradition of the saint-poet Mirabai — counting the breaths like prayer beads, each one His name.' },
  { title: 'Dam Mast Qalandar', poet: 'Amir Khusro (tradition)', language: 'Punjabi', kind: 'Traditional', text: 'A tribute to Lal Shahbaz Qalandar, in the qawwali tradition traced to Amir Khusro in the 13th century.' },
  { title: 'Nit Khair Manga', poet: 'Traditional', language: 'Punjabi', kind: 'Traditional', text: 'A prayer sung in Punjabi, asking for wellbeing — for oneself, for family, for all.' },
];

export const honours = [
  { title: 'Pride of Performance', year: '1987', body: 'Awarded by the Government of Pakistan for his contribution to music.' },
  { title: 'UNESCO Music Prize', year: '—', body: 'A rare international honour recognising him as a cultural ambassador of Pakistan.' },
  { title: 'Grammy nomination', year: '1996', body: 'Night Song, with Michael Brook, was nominated for a Grammy.' },
  { title: 'Guinness World Record', year: '2001', body: 'Largest recorded output by a qawwali artist — 125 albums.' },
  { title: 'Shahenshah-e-Qawwali', year: '—', body: '“Emperor of Qawwali” — the title his audiences gave him.' },
];

export const videos = [
  { title: 'Live at WOMAD 1985', year: '1985', category: 'Historic live', note: 'The performance that introduced qawwali to the West.' },
  { title: 'Royal Albert Hall, London', year: '1987', category: 'Historic live', note: 'Nusrat on one of the world’s great stages.' },
  { title: 'Afreen Afreen — official video', year: '1996', category: 'Music video', note: 'From Sangam, starring Lisa Ray.' },
  { title: 'Allah Hoo — live', year: '1992', category: 'Historic live', note: 'The great devotional, performed live.' },
  { title: 'Dam Mast Qalandar — live', year: '—', category: 'Historic live', note: 'The ecstatic classic, live in concert.' },
  { title: 'Mustt Mustt — live', year: '1990', category: 'Historic live', note: 'The Brook collaboration, performed live.' },
];

export const journeys = [
  { id: 'begin', title: 'Begin here', minutes: '3 songs', text: 'New to Nusrat? Start with Afreen Afreen, then Allah Hoo, then Dam Mast Qalandar — love, devotion, ecstasy.', trackIds: ['afreen', 'allah-hoo', 'dam-mast'] },
  { id: 'devotion', title: 'A night of devotion', minutes: '4 songs', text: 'The slow build of a mehfil: Allah Hoo, Ya Allah Ya Rehman, Nit Khair Manga, Sanson Ki Mala Pe.', trackIds: ['allah-hoo', 'ya-allah', 'nit-khair', 'sanson'] },
  { id: 'world', title: 'Nusrat goes global', minutes: '3 songs', text: 'The collaborations: Mustt Mustt, Sweet Pain, and Ya Gaus Ya Meeran from Chain of Light.', trackIds: ['mustt', 'sweet-pain', 'ya-gaus'] },
];

export const sources = [
  { label: 'Britannica — Nusrat Fateh Ali Khan', url: 'https://www.britannica.com/biography/Nusrat-Fateh-Ali-Khan' },
  { label: 'Real World Records — Nusrat Fateh Ali Khan', url: 'https://realworldrecords.com/artists/nusratfatehalikhan/' },
  { label: 'Encyclopedia.com — Khan, Nusrat Fateh Ali', url: 'https://www.encyclopedia.com/education/dictionaries-thesauruses-pictures-and-press-releases/khan-nusrat-fateh-ali' },
  { label: 'Wikipedia — Nusrat Fateh Ali Khan', url: 'https://en.wikipedia.org/wiki/Nusrat_Fateh_Ali_Khan' },
  { label: 'Wikipedia — Nusrat Fateh Ali Khan discography', url: 'https://en.wikipedia.org/wiki/Nusrat_Fateh_Ali_Khan_discography' },
  { label: 'Dawn — 15 evergreen songs', url: 'https://images.dawn.com/news/1176061/remembering-nusrat-fateh-ali-khan-15-of-the-qawwali-maestros-evergreen-songs' },
];
