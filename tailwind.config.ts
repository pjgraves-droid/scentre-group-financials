import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"STK Bureau Serif"', 'Georgia', '"Times New Roman"', 'serif'],
        sans: ['"NB International Pro"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        cog: {
          black: '#111111',
          body: '#374151',
          muted: '#6b7280',
          light: '#9ca3af',
          border: '#d1d5db',
          rule: '#e5e7eb',
          surface: '#f9fafb',
          white: '#ffffff',
        },
        accent: {
          DEFAULT: "#0e7490",
          fg: "#ffffff",
        },
      },
      letterSpacing: {
        label: '0.15em',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

export default config;
