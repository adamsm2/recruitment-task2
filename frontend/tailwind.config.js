/** @type {import("tailwindcss").Config} */
export default {
  darkMode: "selector",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: ".5rem",
      },
      colors: {
        aquaGreen: {
          "50": "#EDF9F8",
          "100": "#43C2B7",
          "200": "#3ABAB0",
          "300": "#31B2A9",
          "400": "#28AAA2",
          "500": "#1FA29B",
          "600": "#169A94",
        },
      },
    },
  },
  plugins: [],
};

