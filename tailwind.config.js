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
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1140px',
        '2xl': '1320px'
      },
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
      colors: {
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
        success: 
        {
          DEFAULT: "#2DC269",
          100: "#2DC2BD"
        },
        danger: {
          DEFAULT : "#CE4040",
          100: "#F97274" // text color
        },
        color1: "#90999F",
        color2: "#00101C", // text color
        color3: "#BFC4C8", // text color
        color4: "#8998A2",
        color5: "#F2F4F4",
        color6: "#ECECEC",
        color7: "#1E303E", // shadow modal
        color8: "#D6DADC", // text color
        color9: "#0D1C28",
        color10: "#A9A4FD",
        color11: "#AEAAFF",
        color12: "#13222D",
      }
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    // require("daisyui"),
    plugin(function ({ addBase, theme }) {
      addBase({  
        html: { fontSize: "12px",backgroundColor: theme('colors.secondary')},
        h1: { fontSize: "3.5rem" },
        h2: { fontSize: "3rem" },
        h3: { fontSize: "2.5rem" },
        h4: { fontSize: "2rem" },
        h5: { fontSize: "1.5rem" },
        h6: { fontSize: "1.2rem" },
        p: {
          fontSize: "1rem", 
          color: theme('colors.color8'),  
        }, 
      });
    }),
  ],
};
