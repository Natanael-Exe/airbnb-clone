module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Circular", "sans-serif"],
      },
      spacing:{
        '112':'26rem',
        '120':'30.5rem',
        '128': '32rem',
        '144': '36rem',
      }
    },
  },
  variants: {
    extend: {
      borderWidth:['group-focus']
    },
  },
  plugins: [require("tailwind-scrollbar-hide"),require('@tailwindcss/custom-forms'), require("tailwindcss-line-clamp"),],
};
