/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bemytech-green': '#82C232',
        'bemytech-dark': '#070A07',
        'bemytech-gray': '#101410',
        // Aliases para uso más semántico
        'primary': '#070A07',
        'secondary': '#101410',
        'accent': '#82C232',
        'accent-bright': '#A4E84F',
        'surface': '#0C100C',
        'line': 'rgba(130, 194, 50, 0.14)',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['"Space Grotesk"', 'Inter', 'sans-serif'],
        'mono': ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 38s linear infinite',
        'marquee-reverse': 'marquee-reverse 32s linear infinite',
        'float-slow': 'float-slow 7s ease-in-out infinite',
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
      },
      keyframes: {
        'marquee': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0)' },
        },
        'float-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      maxWidth: {
        'site': '76rem',
      },
    },
  },
  plugins: [],
}
