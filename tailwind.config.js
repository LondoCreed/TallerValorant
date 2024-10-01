/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',  // Incluye los archivos donde estás usando clases de Tailwind
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

