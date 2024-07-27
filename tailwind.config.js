/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // roboto: ["Roboto", "sans-serif"],
        // openSans: ["Open Sans", "sans-serif"],
        // dancingScript: ["Dancing Script", "cursive"],
        // merriweather: ["Merriweather", "serif"],
        // playfairDisplay: ['Playfair Display', 'serif'],
        lora: ['Lora', 'serif'],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
