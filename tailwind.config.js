const { heroui } = require("@heroui/theme");

module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.js",
  ],
  darkMode: "class",
  plugins: [heroui(), require("tailwind-scrollbar")({ nocompatible: true })],
};
