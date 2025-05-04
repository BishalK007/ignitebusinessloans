/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: {
          orange: "var(--accent-orange)",
          brown: "var(--accent-brown)",
          // Example lighter/darker shades using color-mix
          orangeLight: "color-mix(in srgb, var(--accent-orange) 70%, white)",
          orangeDark: "color-mix(in srgb, var(--accent-orange) 70%, black)",
          brownLight: "color-mix(in srgb, var(--accent-brown) 70%, white)",
          brownDark: "color-mix(in srgb, var(--accent-brown) 70%, black)",
        },
        primary: "var(--accent-orange)",
        secondary: "var(--accent-brown)",
        Black: {
          DEFAULT: "var(--background)",
          950: "color-mix(in srgb, var(--background) 80%, black)",
        },
        White: {
          DEFAULT: "var(--foreground)",
        },
        Orange: {
          DEFAULT: "var(--accent-orange)",
          100: "color-mix(in srgb, var(--accent-orange) 20%, white)",
          200: "color-mix(in srgb, var(--accent-orange) 40%, white)",
          500: "var(--accent-orange)",
          600: "color-mix(in srgb, var(--accent-orange) 80%, black)",
        },
        DeepOrange: {
          DEFAULT: "var(--accent-brown)",
          500: "var(--accent-brown)",
          600: "color-mix(in srgb, var(--accent-brown) 80%, black)",
        },
        Gray: {
          DEFAULT: "a0a0a0",
          100:"#d1d5dc",
          700: "#5e5e5e",
        },
        Yellow: {
          DEFAULT: "#eeff00",
          100:"#edffb2",
          500:"#fff842",
        },
      },
      fontFamily: {
        barlow: 'var(--font-barlow)',
      },
    },
  },
  plugins: [],
};
