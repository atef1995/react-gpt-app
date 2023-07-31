/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [// Example content paths...
    './public/**/*.html',
    './src/**/*.{js,jsx,ts,tsx,vue}',],
  theme: {
    extend: {
      animation: {
        'gradient-x': 'gradient-x 30s ease infinite',
        'gradient-y': 'gradient-y 30s ease infinite',
        'gradient-xy': 'gradient-xy 30s ease infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '100% 50%',
            'background-position': '0 100%'
          },
          '50%': {
            'background-size': '100% 50%',
            'background-position': '0 0'
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center'
          },
        }
      }
    }
  },
  plugins: [],
}

