/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        nexar1: ["Font1"],
        nexar2: ["Font2"],
        nexar3: ["Font3"],
      },
    },
  },
  plugins: [],
};
