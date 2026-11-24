/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight:     '#0B1026',
        royalpurple:  '#342454',
        dustyrose:    '#D98FA8',
        warmpeach:    '#F4B8A4',
        champagnegold:'#E8C88D',
        softivory:    '#FFF6EE',
      },
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        dm:       ['"DM Sans"', 'sans-serif'],
        vibes:    ['"Great Vibes"', 'cursive'],
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'lantern-float': 'lanternFloat 14s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.8', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        lanternFloat: {
          '0%': { transform: 'translateY(0) translateX(0) scale(0.9)', opacity: '0.2' },
          '20%': { opacity: '0.85' },
          '80%': { opacity: '0.85' },
          '100%': { transform: 'translateY(-100vh) translateX(40px) scale(1.15)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
