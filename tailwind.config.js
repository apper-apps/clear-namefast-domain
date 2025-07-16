/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F1EFFF',
          100: '#E4E2FF',
          200: '#CCC8FF',
          300: '#A8A0FF',
          400: '#8B7FF7',
          500: '#5B47F5',
          600: '#4C38E8',
          700: '#3D2AD1',
          800: '#2E1FAA',
          900: '#1F1575'
        },
        accent: {
          50: '#FFF1F1',
          100: '#FFE2E2',
          200: '#FFC8C8',
          300: '#FF9A9A',
          400: '#FF6B6B',
          500: '#FF3B3B',
          600: '#E82E2E',
          700: '#CC1F1F',
          800: '#A31919',
          900: '#7A1313'
        },
        surface: {
          50: '#FFFFFF',
          100: '#F8F9FB',
          200: '#F1F3F7',
          300: '#E5E8ED',
          400: '#D1D6DC',
          500: '#9CA3AF',
          600: '#6B7280',
          700: '#374151',
          800: '#1F2937',
          900: '#111827'
        }
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        'card': '0 2px 8px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 32px rgba(91, 71, 245, 0.15)',
        'premium': '0 20px 60px rgba(0, 0, 0, 0.08)'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #5B47F5 0%, #8B7FF7 100%)',
        'gradient-accent': 'linear-gradient(135deg, #FF6B6B 0%, #FF9A9A 100%)',
        'gradient-surface': 'linear-gradient(135deg, #F8F9FB 0%, #FFFFFF 100%)'
      }
    },
  },
  plugins: [],
}