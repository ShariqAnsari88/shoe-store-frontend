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
      normal: "Euclid",
      bold: "Euclid_Bold",
      semibold: "Euclid_SemiBold",
      hearthLess: "Hearthless"
    },
    extend: {
      colors: {
        offWhite: "#EEEEEE",
        neonGreen: "#168900",
        neonGreenLighter: "#33ff14",
        darkBlack: "#181516",
        darkRed: "#B22222",
       },
       backgroundImage: {
        'troykaEye': "url('../assets/images/troyka-eye.png')",
      },
    },
  },
  plugins: [],
};
