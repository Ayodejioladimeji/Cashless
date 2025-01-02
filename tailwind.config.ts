import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          primary: "#7141F8",
          500: "rgb(113, 65, 248)",
          400: "rgb(141, 103, 250)",
          300: "rgb(170, 141, 251)",
          200: "rgb(198, 179, 252)",
          100: "rgb(227, 217, 254)",
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
