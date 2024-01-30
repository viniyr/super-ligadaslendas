/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        grow: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.7)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "lol-main": "#45004f",
        "lol-dark": "#23002c",
        "lol-carbon": "#151A1D",
        "lol-wine": "#5c0001",
        "lol-red": "#780008",
        "lol-blood": "#3a0000",
        "lol-slate": "#B1A7A6",
        "lol-gray": "#D3D3D3",
        "lol-close-white": "#F5F3F4",
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 1)",
          "0 0px 65px rgba(255, 255,255, 0.3)",
        ],
      },
      animation: {
        shake: "shake 2s ease-in-out infinite",
        grow: "grow 1s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
