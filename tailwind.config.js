/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["IRANSans", "vazir", "sans-serif"],
    },
    extend: {
      colors: {
        primary: {
          light: "#67e8f9",
          DEFAULT: "#534CDA",
          dark: "#0e7490",
        },
        secondary: {
          light: "#67e8f9",
          DEFAULT: "#081823",
          dark: "#0e7490",
        },
        tertiary: {
          light: "#67e8f9",
          DEFAULT: "#303D47",
          dark: "#0e7490",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "11px", color: "white" },
        h2: { fontSize: "40px" },
        h5: { fontSize: "20px" },
      });
    }),
  ],
};
