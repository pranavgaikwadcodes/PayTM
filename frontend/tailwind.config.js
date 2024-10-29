/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: "#7F7F7F",
        black: "#18181A",
        white: "#FFFFFF",
      },
    }
  },
  plugins: [],
}

