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
        primary: "#0a3977",
        secondary: "#00b8a9",

        Black: {
          DEFAULT: "#0f1418",
          950: "#030712"
        },
        White: {
          DEFAULT: "#efe6d5",
        },
        Orange: {
          DEFAULT: "#d35523",
          100:"#fc9758",
          200:"#ff6467",
          500: "#d35523", // Default shade
          600: "#b8431f", // Slightly darker for hover
        },
        DeepOrange: {
          DEFAULT: "#702604",
          500: "#702604", // Default shade
          600: "#5a1f03", // Slightly darker for hover
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
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [],
};
