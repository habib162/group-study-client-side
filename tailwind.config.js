/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['poppins', 'sans-serif'],
      },
    },
  },
  // daisyui: {
  //   themes: [
  //     "emerald"
  //   ],
  // },
  plugins: [require("daisyui")],
}