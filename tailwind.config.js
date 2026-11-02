/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        manrope: ["Manrope", "sans-serif"],
        epilogue: ["Inter", "sans-serif"],
      },
      colors: {
        primary: {
          50: "#e0f7fa",
          100: "#b3ecf3",
          200: "#80deea",
          300: "#4dd0e1",
          400: "#26c6da",
          500: "#00b4d8",
          600: "#0096c7",
          700: "#0077b6",
          800: "#005f8f",
          900: "#023e8a",
        },
        secondary: {
          50: "#f5f3ff",
          100: "#ede9fe",
          200: "#ddd6fe",
          300: "#c4b5fd",
          400: "#a78bfa",
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#5b21b6",
          800: "#4c1d95",
          900: "#3b0764",
        },
        accent: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
          700: "#b45309",
          800: "#92400e",
          900: "#78350f",
        },
        success: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        danger: {
          50: "#fef2f2",
          100: "#fee2e2",
          200: "#fecaca",
          300: "#fca5a5",
          400: "#f87171",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        dark: {
          800: "#1e2130",
          900: "#1a1d29",
        },
      },
      boxShadow: {
        sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
        DEFAULT: "0 2px 8px rgba(0, 0, 0, 0.08)",
        md: "0 4px 12px rgba(0, 0, 0, 0.1)",
        lg: "0 8px 24px rgba(0, 0, 0, 0.12)",
        xl: "0 12px 32px rgba(0, 0, 0, 0.15)",
        "2xl": "0 20px 48px rgba(0, 0, 0, 0.18)",
        primary: "0 4px 12px rgba(0, 180, 216, 0.3)",
        "primary-lg": "0 8px 20px rgba(0, 180, 216, 0.4)",
        secondary: "0 4px 12px rgba(124, 58, 237, 0.3)",
        accent: "0 4px 12px rgba(245, 158, 11, 0.3)",
        success: "0 4px 12px rgba(16, 185, 129, 0.3)",
        "glow-multi":
          "0 4px 6px -1px rgba(0,180,216,0.1), 0 2px 4px -1px rgba(0,180,216,0.06)",
      },
      borderRadius: {
        DEFAULT: "12px",
        lg: "16px",
        xl: "20px",
        "2xl": "24px",
        "3xl": "32px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh":
          "radial-gradient(at 40% 20%, rgba(99, 102, 241, 0.3) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.3) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(236, 72, 153, 0.3) 0px, transparent 50%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        slideInUp: "slideInUp 0.6s ease-out",
        scaleIn: "scaleIn 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(99, 102, 241, 0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(139, 92, 246, 0.6)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        slideInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.9)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
      },
      transitionProperty: {
        smooth: "all",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
      transitionDuration: {
        smooth: "200ms",
      },
    },
  },
  darkMode: ["class", '[data-theme="dark"]'],
  plugins: [
    require('fast-deep-thinking')({
      duration: '200ms',
      delay: '1s',
      iterationCount: '4'
    })
  ],
};
