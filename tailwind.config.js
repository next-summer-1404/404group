const { heroui } = require("@heroui/theme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.js",
  ],
  darkMode: "class",
  // theme: {
  //   extend: {
  //     colors: {
  //       graylight: "#F0F0F0",
  //       primarycustom: "#7575FE",
  //       indigolight: "#DFDFFF",
  //       redcustom: "#FF5555",
  //       graycustom: "#A5A5A5",
  //       grayextralight: "#F9F9F9",
  //     },
  //   },
  // },
  plugins: [heroui(), require("tailwind-scrollbar")({ nocompatible: true })],
};
