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
          50: "#eef6ff",
          100: "#d9e9ff",
          200: "#bdd9ff",
          300: "#92c1ff",
          400: "#5f9eff",
          500: "#3878ff",
          600: "#2759f5",
          700: "#2045df",
          800: "#213ab4",
          900: "#22378d",
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
