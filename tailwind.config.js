/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Forest green (repurposed from old 'brand')
        forest: {
          DEFAULT: '#166534',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#166534',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        // Keep brand alias for backward compat with demo pages
        brand: {
          DEFAULT: '#166534',
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#166534',
          700: '#15803d',
          800: '#166534',
          900: '#14532d'
        },
        // Gold accent
        gold: {
          400: '#d4a843',
          500: '#c49a2e',
        },
      }
    }
  }
}
