import plugin from 'tailwindcss'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{html,js,ts,jsx,tsx}",
    "./pages/**/*.{html,js,ts,jsx,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      normal: "Boffin",
      bold: "Boffin-B",
      semibold: "Boffin-M",
      hearthLess: "Hearthless",
      backdropFilter: {
        none: "none",
        blur: "blur(20px)",
      },
    },
    extend: {
      colors: {
        offWhite: "#EEEEEE",
        neonGreen: "#168900",
        neonGreenLighter: "#33ff14",
        darkBlack: "#181516",
        darkRed: "#B22222",
        errorYellow: "#FFC95F",
      },
      backgroundImage: {
        troykaEye: "url('../assets/images/troyka-eye.png')",
        random:
          "url('/about-us-3.jpg')",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      )
    }),
  ],
};
