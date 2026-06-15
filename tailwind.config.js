/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 1. Прописываем логику движения (ключевые кадры)
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      // 2. Объявляем класс animate-shimmer, который можно использовать в коде
      animation: {
        shimmer: "shimmer 2s infinite linear", // linear сделает движение волны идеально плавным
      },
    },
  },
  plugins: [],
};