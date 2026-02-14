import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["Cormorant Garamond", "Georgia", "serif"],
        handwriting: ["Cormorant Garamond", "Georgia", "serif"],
        sans: ["Cormorant Garamond", "Georgia", "serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        valentine: {
          rose: "hsl(var(--valentine-rose))",
          blush: "hsl(var(--valentine-blush))",
          lavender: "hsl(var(--valentine-lavender))",
          peach: "hsl(var(--valentine-peach))",
          gold: "hsl(var(--valentine-gold))",
          deep: "hsl(var(--valentine-deep))",
          glow: "hsl(var(--valentine-glow))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
        "float-up": {
          "0%": { transform: "translateY(0) rotate(0deg) scale(1)", opacity: "1" },
          "100%": { transform: "translateY(-110vh) rotate(360deg) scale(0.3)", opacity: "0" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "25%": { transform: "scale(1.04)" },
          "50%": { transform: "scale(1)" },
          "75%": { transform: "scale(1.02)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.2" },
          "50%": { opacity: "1" },
        },
        "gentle-float": {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-4px) rotate(0.3deg)" },
        },
        "gradient-shift": {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px 5px hsl(345 80% 65% / 0.2)" },
          "50%": { boxShadow: "0 0 40px 15px hsl(345 80% 65% / 0.35)" },
        },
        "ambient-blob-1": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(-30px, 20px) scale(1.1)" },
          "66%": { transform: "translate(20px, -15px) scale(0.95)" },
        },
        "ambient-blob-2": {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "33%": { transform: "translate(25px, -20px) scale(1.05)" },
          "66%": { transform: "translate(-15px, 25px) scale(0.9)" },
        },
        "ambient-blob-3": {
          "0%, 100%": { transform: "translate(-50%, -50%) scale(1)", opacity: "0.8" },
          "50%": { transform: "translate(-50%, -50%) scale(1.15)", opacity: "1" },
        },
        "ambient-particle": {
          "0%": { transform: "translateY(0) translateX(0)", opacity: "0" },
          "10%": { opacity: "0.6" },
          "90%": { opacity: "0.6" },
          "100%": { transform: "translateY(-100vh) translateX(30px)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "float-up": "float-up 14s linear forwards",
        heartbeat: "heartbeat 3s ease-in-out infinite",
        wiggle: "wiggle 2s ease-in-out infinite",
        twinkle: "twinkle 3s ease-in-out infinite",
        "gentle-float": "gentle-float 5s ease-in-out infinite",
        "gradient-shift": "gradient-shift 15s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "ambient-blob-1": "ambient-blob-1 20s ease-in-out infinite",
        "ambient-blob-2": "ambient-blob-2 25s ease-in-out infinite",
        "ambient-blob-3": "ambient-blob-3 18s ease-in-out infinite",
        "ambient-particle": "ambient-particle 20s linear infinite",
        marquee: "marquee 40s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
