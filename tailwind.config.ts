import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Synchronized with Navy + Yellow + Beige design system
        navy: {
          dark: '#0a1929',
          medium: '#1a2942',
          light: '#2a3952',
        },
        yellow: {
          primary: '#ffc107',
          dark: '#d39e00',
          light: '#ffcd39',
        },
        pink: {
          accent: '#ff1744',
          dark: '#d50000',
          light: '#ff5252',
        },
        beige: {
          card: '#f5e6d3',
          dark: '#e6d7c4',
          light: '#fff5e6',
        },
      },
    },
  },
  plugins: [],
};

export default config;
