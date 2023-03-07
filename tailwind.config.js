/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
    corePlugins: {
        container: false
    },
    content: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
        "./layouts/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        screens: {
            xs: '320px',
            sm: '576px',
            md: '768px',
            lg: '992px',
            xl: '1200px',
            '2xl': '1400px'
        },
        container: {
            center: true,
            padding: {
                DEFAULT: '1.25rem',
                sm: '2.5rem'
            }
        },
        fontFamily: {
            sans: ["IRANSans", "vazir", "sans-serif"],
        },
        extend: {
            animation: {
                text: 'text 5s ease infinite',
                fadeIn: 'fadeIn .5s ease',
                fadeOut: 'fadeOut .5s ease',
            },
            keyframes: {
                text: {
                    '0%, 100%': {
                        'background-size': '200% 200%',
                        'background-position': 'left center',
                    },
                    '50%': {
                        'background-size': '200% 200%',
                        'background-position': 'right center',
                    },
                },
                fadeIn: {
                    '0%': {opacity: '0', height: "auto"},
                    '100%': {opacity: '1'},
                },
                fadeOut: {
                    '0%': {opacity: '1'},
                    '90%': {opacity: '0'},
                    '100%': {height: 0},
                }
            },
            boxShadow: {
                '3xl': '8px 11px 23px 0px rgb(0 0 0 / 4%)',
                '4xl': '6px 4px 15px 0px rgb(0 0 0 / 9%)',
            },
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
            colors: {
                primary: "#534CDA",
                "primary-focus": "#534CDA",
                secondary: {
                    DEFAULT: "#081823",
                    light: "#0D1C28",
                    100: "#455661",
                    200: "#54626C",
                    300: "#90999F",
                    400: "#23303B",
                    500: "#00101C",
                    600: "#13222D",
                },
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
                    DEFAULT: "#CE4040",
                    100: "#F97274" // text color
                },
                color2: "#00101C", // text color
                color3: "#BFC4C8", // text color
                gray: "#8998A2",
                color5: "#F2F4F4",
                color6: "#ECECEC",
                color7: "#1E303E", // shadow modal
                color8: "#D6DADC", // text color
                color9: "#F8F8F8",
                color10: "#A9A4FD",
                color11: "#AEAAFF",
                cyan: "#55DBCB",
            }
        },
    },
    plugins: [
        require('@headlessui/tailwindcss')({prefix: 'ui'}),
        require("@tailwindcss/typography"),
        require("tailwindcss-animate"),
        require('tailwind-scrollbar'),
        require("@tailwindcss/forms"),
        function ({addComponents}) {
            addComponents({
                '.container': {
                    width: '100%',
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    paddingLeft: "1.5rem",
                    paddingRight: "1.5rem",
                    '@screen sm': {
                        maxWidth: '640px',
                    },
                    '@screen md': {
                        maxWidth: '768px',
                    },
                    '@screen lg': {
                        maxWidth: '1024px',
                    },
                    '@screen xl': {
                        maxWidth: '1280px',
                    },
                }
            })
        },
        plugin(function ({addBase, theme}) {
            addBase({
                html: {fontSize: "12px", backgroundColor: theme('colors.color2')},
                h1: {fontSize: "3rem"},
                h2: {fontSize: "2.5rem"},
                h3: {fontSize: "2rem"},
                h4: {fontSize: "1.7rem"},
                h5: {fontSize: "1.4rem"},
                h6: {fontSize: "1rem"},
                p: {
                    fontSize: "1rem",
                    color: theme('colors.color8'),
                },
            });
        }),
    ],
};
