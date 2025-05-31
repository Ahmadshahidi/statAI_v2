/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#f0f4f9',
          100: '#d9e2ed',
          200: '#b3c5db',
          300: '#8da8c9',
          400: '#668bb7',
          500: '#406ea5',
          600: '#1a365d',
          700: '#152c4a',
          800: '#112338',
          900: '#0c1a26',
        },
        secondary: {
          50: '#e6faf8',
          100: '#ccf5f1',
          200: '#99ebe3',
          300: '#66e0d5',
          400: '#33d6c7',
          500: '#0d9488',
          600: '#0a766c',
          700: '#085950',
          800: '#053b34',
          900: '#031e1a',
        },
        accent: {
          50: '#fdf9e6',
          100: '#fbf3cc',
          200: '#f7e799',
          300: '#f3da66',
          400: '#efce33',
          500: '#ca8a04',
          600: '#a26e03',
          700: '#795202',
          800: '#513702',
          900: '#281b01',
        },
      },
    },
  },
  plugins: [],
}