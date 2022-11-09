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
    require("daisyui"),
    plugin(function ({ addBase, theme }) {
      addBase({
        html: { fontSize: "11px" },
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
          "--bc": "204 64% 255%",
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
