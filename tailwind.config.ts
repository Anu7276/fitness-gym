import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A1A1F",
          deep: "#06151A",
        },
        surface: {
          DEFAULT: "#0F2329",
          elevated: "#142D35",
          high: "#1D3A44",
        },
        line: {
          DEFAULT: "#1E3840",
          light: "#2A4B56",
        },
        accent: {
          red: "#F21B35",
          glow: "rgba(242, 27, 53, 0.2)",
        },
        text: {
          primary: "#FFFFFF",
          secondary: "#B7C4C8",
          muted: "#7B8E94",
        },
      },
      fontFamily: {
        heading: ["var(--font-heading)", "var(--font-outfit)", "sans-serif"],
        body: ["var(--font-body)", "var(--font-manrope)", "sans-serif"],
      },
      borderRadius: {
        card: "12px",
        pill: "9999px",
        photo: "0px",
      },
      boxShadow: {
        subtle: "0 10px 30px -10px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;

