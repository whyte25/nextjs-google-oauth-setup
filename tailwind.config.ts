import type { Config } from "tailwindcss";
const defaultTheme = require("tailwindcss/defaultTheme");

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      "2xsm": "375px",
      xs: "425px",
      "2xl": "1400px",
      "4k": "1500px",
      ...defaultTheme.screens,
    },
    fontFamily: {
      sans: ["Instrument Sans", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        primary: "#2D39A8",
        "light-blue-gray": "#F7F8FD",
        "brand-black": "#161C2C",
        customGray: {
          shade1: "#9AA1A6",
          shade2: "#485467",
          shade3: "#AEB7C6",
          shade4: "#F7F8FD",
        },
      },
      maxWidth: {
        "8xl": "85rem",
      },
      fontSize: {
        custom: "40px",
      },
      boxShadow: {
        normal:
          "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
        small: "rgba(0, 0, 0, 0.1) 0px 1px 4px",
        medium: "rgba(0, 0, 0, 0.08) 0px 4px 12px",
        tiny: "rgba(0, 0, 0, 0.05) 0px 1px 2px 0px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },

        moveBorder: {
          "0%": {
            backgroundPosition: "0 0, 100% 100%, 0 100%, 100% 0",
          },
          "100%": {
            backgroundPosition: "100% 0, 0 100%, 0 0, 100% 100%",
          },
        },

        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px, -50px) scale(1.2)",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.9)",
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)",
          },
        },
        "tag-input-scale-in": {
          "0%": {
            transform: "scale(0.5)",
            opacity: "0",
          },
          "50%": {
            transform: "scale(1.05)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        fadeIn: "fadeIn 0.2s ease-in",
        "move-border": "moveBorder 4s infinite linear",
        blob: "blob 4s infinite",
        "tag-input-scale-in": "tag-input-scale-in 0.3s ease-in-out forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;
