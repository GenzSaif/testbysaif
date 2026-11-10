/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // v2 theme: "Gallery" — warm ivory canvas, deep slate ink,
        // one vivid indigo accent, soft teal as a secondary.
        ivory: '#FAF9F6',
        mist: '#F1EFEA',
        ink: '#111827',
        slate2: '#6B7280',
        line: '#E7E5E0',
        accent: '#4F46E5',
        accentSoft: '#EEF2FF',
        teal2: '#0D9488',
        night: '#0D1117',
        nightCard: '#161B22',
        nightLine: '#262D38',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(17,24,39,0.06), 0 8px 24px rgba(17,24,39,0.06)',
        lift: '0 4px 12px rgba(17,24,39,0.08), 0 16px 40px rgba(17,24,39,0.10)',
      },
    },
  },
  plugins: [],
};
