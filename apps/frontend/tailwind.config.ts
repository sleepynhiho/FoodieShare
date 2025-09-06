import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Background
        bg: {
          default: "#fffefd", // body background
          card: "#ffffff",    // card / container
          button: "#f6f6f6",  // button background
          secondary: "#ffa319"
        },
        text: {
          primary: "#ffa319", // orange
          default: "#111111", // main text
          muted: "#4B5563",   // gray text
        },
        border: {
          default: "#E5E7EB", // gray-200
          primary: "#ffa319", // orange
        }
      },
      borderRadius: {
        md: "0.5rem",
        lg: "1rem",
      },
      spacing: {
        72: "18rem",
        84: "21rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [],
} satisfies Config;
