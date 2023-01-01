/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.25rem',
        sm: '0.75rem'
      }
    },
    fontFamily: {
      sans: ["IRANSans", "vazir", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        'hero-pattern': "linear-gradient(0deg, rgba(83,76,218,0.8) 0%, rgba(174,170,255,0.8) 100%),url('../public/icons/LoginImage.jpg')",
     },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.gray.700"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("daisyui"),
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { fontSize: "12px" },
        h2: { fontSize: "40px" },
        h5: { fontSize: "20px" },
      });
    }),
  ],
  daisyui: {
    styled: true,
    themes: [
      {
        dark: {
          primary: "#534CDA",
          "primary-focus": "#534CDA",
          secondary: "#081823",
          accent: "#303D47",
          neutral: "#23282F",
          "base-100": "#081823",
          info: "#0092D6",
          success: "#6CB288",
          warning: "#DAAD58",
          error: "#AB3D30",
        },
      },
    ],
    base: true,
    utils: true,
    logs: true,
    rtl: true,
    prefix: "",
    darkTheme: "",
  },
};
