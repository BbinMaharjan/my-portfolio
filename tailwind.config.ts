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
        brand: {
          50: "#e0f7fa",
          100: "#b2e0e8",
          200: "#81ded4",
          300: "#4fd1c5",
          400: "#2cc4b8",
          500: "#00b8a9",
          600: "#009688",
          700: "#00838f",
          800: "#006064",
          900: "#004d56",
        },
      },
      boxShadow: {
        panel:
          "0 10px 30px -12px rgba(11, 20, 45, 0.35), 0 0 0 1px rgba(148, 163, 184, 0.14)",
      },
    },
  },
  plugins: [],
};

export default config;
