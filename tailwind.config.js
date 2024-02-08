/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3580FF",
        secondary: "#e6efff",
        tertiary: "#FF7754",
      
        gray: "#83829A",
        lightGray: "#f2f2f2",
        gray2: "#C1C0C8",
      
        dark: "#002055",
        white: "#F3F4F8",
        lightWhite: "#FAFAFC",
      },
    },
  },
  plugins: [],
};
