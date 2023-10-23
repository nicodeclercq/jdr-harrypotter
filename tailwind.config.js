const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  media: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: {
        50: "#E7FAFE",
        100: "#B6F7FF",
        200: "#80E1F5",
        300: "#51CEEC",
        400: "#039AC2",
        500: "#016788",
        600: "#004973",
        700: "#00376E",
        800: "#031B41",
        900: "#00000A",
      },
      yellow: {
        50: "#FFF4B7",
        100: "#FFED82",
        200: "#FFE85B",
        300: "#FFE440",
        400: "#FEDD56",
        500: "#E2AC66",
        600: "#AE6731",
        700: "#9D541D",
        800: "#411304",
        900: "#200C00",
      },
    },
    extend: {},
  },
  variants: {
    extend: {
      zIndex: ["hover"],
    },
  },
  plugins: [],
};
