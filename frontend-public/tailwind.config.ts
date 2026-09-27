import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#07090E",
        surface: "#101522",
        "surface-light": "#1A2234",
        primary: {
          DEFAULT: "#E5A93C",
          light: "#FCD34D",
          dark: "#B45309",
        },
      },
      fontFamily: {
        serif: ["Cinzel", "serif"],
        sans: ["var(--font-sans)", "sans-serif"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
export default config;
