import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Gokiwi-inspired design tokens — original QR Studio work,
        // no gokiwi copy, brand, logo or artwork.
        kiwi: {
          bg: "#F4FFEB",
          ink: "#212121",
          nearblack: "#0A0A0A",
          olive: "#555C4D",
          accent: "#58A60A",
          bright: "#81D829",
          lime: "#BDE930",
          electric: "#80FF00",
          bluegray: "#E7ECEF",
          sky: "#DFF1FC",
          teal: "#194965",
          inactive: "#CDD3D6",
          cream: "#FAF2E6",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "Playfair Display", "Georgia", "Palatino", "serif"],
        sans: ["var(--font-sans)", "Sora", "ui-sans-system", "system-ui", "sans-serif"],
      },
      borderRadius: {
        sheet: "80px",
        card: "36px",
      },
      boxShadow: {
        card: "0 4px 38px rgba(0,0,0,.05)",
        nav: "0 10px 36px rgba(0,0,0,.14)",
      },
    },
  },
  plugins: [],
};
export default config;
