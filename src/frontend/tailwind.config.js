import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        ring: "oklch(var(--ring) / <alpha-value>)",
        background: "oklch(var(--background))",
        foreground: "oklch(var(--foreground))",
        primary: {
          DEFAULT: "oklch(var(--primary) / <alpha-value>)",
          foreground: "oklch(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "oklch(var(--secondary) / <alpha-value>)",
          foreground: "oklch(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "oklch(var(--destructive) / <alpha-value>)",
          foreground: "oklch(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "oklch(var(--muted) / <alpha-value>)",
          foreground: "oklch(var(--muted-foreground) / <alpha-value>)",
        },
        accent: {
          DEFAULT: "oklch(var(--accent) / <alpha-value>)",
          foreground: "oklch(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "oklch(var(--popover))",
          foreground: "oklch(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "oklch(var(--card))",
          foreground: "oklch(var(--card-foreground))",
        },
        chart: {
          1: "oklch(var(--chart-1))",
          2: "oklch(var(--chart-2))",
          3: "oklch(var(--chart-3))",
          4: "oklch(var(--chart-4))",
          5: "oklch(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "oklch(var(--sidebar))",
          foreground: "oklch(var(--sidebar-foreground))",
          primary: "oklch(var(--sidebar-primary))",
          "primary-foreground": "oklch(var(--sidebar-primary-foreground))",
          accent: "oklch(var(--sidebar-accent))",
          "accent-foreground": "oklch(var(--sidebar-accent-foreground))",
          border: "oklch(var(--sidebar-border))",
          ring: "oklch(var(--sidebar-ring))",
        },
        neon: {
          lime: "#CCFF00",
          pink: "#FF006B",
          cyan: "#00D9FF",
          orange: "#FF8C00",
        },
      },
      fontFamily: {
        display: ["Space Grotesk", "var(--font-display)", "sans-serif"],
        body: ["Space Grotesk", "var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.3)",
        subtle: "0 2px 8px 0 rgba(204,255,0,0.12)",
        elevated: "0 4px 16px 0 rgba(204,255,0,0.18)",
        "glow-lime": "0 0 16px rgba(204,255,0,0.55), 0 0 40px rgba(204,255,0,0.25)",
        "glow-lime-sm": "0 0 8px rgba(204,255,0,0.5)",
        "glow-pink": "0 0 16px rgba(255,0,107,0.55), 0 0 40px rgba(255,0,107,0.25)",
        "glow-pink-sm": "0 0 8px rgba(255,0,107,0.5)",
        "glow-cyan": "0 0 16px rgba(0,217,255,0.55), 0 0 40px rgba(0,217,255,0.25)",
        "glow-cyan-sm": "0 0 8px rgba(0,217,255,0.5)",
        "glow-orange": "0 0 16px rgba(255,140,0,0.55), 0 0 40px rgba(255,140,0,0.25)",
        "glow-card-lime": "0 0 0 2px rgba(204,255,0,0.7), 0 0 28px rgba(204,255,0,0.3)",
        "glow-card-cyan": "0 0 0 2px rgba(0,217,255,0.7), 0 0 28px rgba(0,217,255,0.3)",
        "glow-card-pink": "0 0 0 2px rgba(255,0,107,0.7), 0 0 28px rgba(255,0,107,0.3)",
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
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-down": {
          "0%": { opacity: "0", transform: "translateY(-16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        glitch: {
          "0%, 100%": { transform: "translate(0,0)" },
          "20%": { transform: "translate(3px,-2px)" },
          "40%": { transform: "translate(-3px,2px)" },
          "60%": { transform: "translate(2px,-1px) skewX(-2deg)" },
          "80%": { transform: "translate(-1px,1px) skewX(1deg)" },
        },
        "neon-pulse": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(204,255,0,0.4), 0 0 20px rgba(204,255,0,0.2)" },
          "50%": { boxShadow: "0 0 18px rgba(204,255,0,0.9), 0 0 44px rgba(204,255,0,0.5)" },
        },
        "neon-pulse-pink": {
          "0%, 100%": { boxShadow: "0 0 8px rgba(255,0,107,0.4), 0 0 20px rgba(255,0,107,0.2)" },
          "50%": { boxShadow: "0 0 18px rgba(255,0,107,0.9), 0 0 44px rgba(255,0,107,0.5)" },
        },
        "bounce-scale": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.12)" },
        },
        "scale-pop-in": {
          "0%": { opacity: "0", transform: "scale(0.8)" },
          "60%": { transform: "scale(1.04)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(204,255,0,0.5), 0 0 10px rgba(204,255,0,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(204,255,0,0.8), 0 0 20px rgba(204,255,0,0.5)" },
        },
        "bounce-neon": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
        "slide-up": "slide-up 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
        "slide-down": "slide-down 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        glitch: "glitch 0.4s ease-in-out",
        "neon-pulse": "neon-pulse 2s ease-in-out infinite",
        "neon-pulse-pink": "neon-pulse-pink 2s ease-in-out infinite",
        "bounce-scale": "bounce-scale 1.2s ease-in-out infinite",
        "scale-pop-in": "scale-pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1)",
        "gradient-shift": "gradient-shift 4s ease infinite",
        float: "float 3s ease-in-out infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "bounce-neon": "bounce-neon 1s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
