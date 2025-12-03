/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Palette Pronovias
      colors: {
        // Couleurs principales
        'pronovias-black': '#000000',
        'pronovias-white': '#FFFFFF',

        // Gris (backgrounds et textes)
        'pronovias-gray': {
          50: '#FAFAFA',
          100: '#F5F5F5',
          200: '#EEEEEE',
          300: '#E0E0E0',
          400: '#BDBDBD',
          500: '#9E9E9E',
          600: '#757575',
          700: '#616161',
          800: '#424242',
          900: '#212121',
        },

        // Textes
        'pronovias-text': {
          primary: '#000000',
          secondary: '#666666',
          light: '#999999',
          white: '#FFFFFF',
        },

        // Bordures
        'pronovias-border': {
          light: '#F0F0F0',
          DEFAULT: '#E5E5E5',
          dark: '#CCCCCC',
        },
      },

      // Typographie Pronovias
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },

      fontSize: {
        // Tailles de texte Pronovias
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.05em' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.025em' }],
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '0' }],
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '0' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],
      },

      fontWeight: {
        light: 300,
        normal: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },

      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.025em',
        normal: '0',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
        'extra-wide': '0.15em',
      },

      // Espacements Pronovias
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
        '34': '8.5rem',
      },

      // Hauteurs spécifiques
      height: {
        'header': '5rem', // 80px
        'header-mobile': '4rem', // 64px
        'topbar': '2.5rem', // 40px
      },

      maxWidth: {
        'container': '1920px',
        'content': '1440px',
      },

      // Border radius Pronovias (très subtil)
      borderRadius: {
        'none': '0',
        'sm': '2px',
        'DEFAULT': '4px',
        'md': '6px',
        'lg': '8px',
      },

      // Transitions Pronovias
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },

      // Box shadows subtiles
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
      },

      // Aspect ratios pour images produits
      aspectRatio: {
        'product': '3 / 4', // Portrait produit
        'banner': '16 / 9', // Bannières
        'square': '1 / 1',
        'wide': '21 / 9',
      },
    },
  },
  plugins: [],
}
