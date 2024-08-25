// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**/*.{html,js}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }
// module.exports = {
 
// };


// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark2: '#3498db',
        dark1: '#112d4e',
        light1: '#dbe2ef',
        light2: '#f9f7f7',
      },
      // fontFamily: {
      //   sans: ['Merriweather Sans', 'sans-serif'],
      // },
    },
  },
  plugins: [],
};
