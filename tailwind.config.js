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

    },
  },
  plugins: [
    require("daisyui"),
    plugin(function ({ addBase }) {
      addBase({
        html: { fontSize: "11px"},
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
          secondary: "#081823",
          accent: "#303D47",
          neutral: "#23282F",
          "base-100": "#081823",
          "--bc": "#fff",
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
