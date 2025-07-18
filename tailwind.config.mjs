/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bemytech-green': '#8BC53F',
        'bemytech-dark': '#0D0D0D',
        'bemytech-gray': '#1a1a1a',
        // Aliases para uso más semántico
        'primary': '#0D0D0D',    // bemytech-dark
        'secondary': '#1a1a1a',  // bemytech-gray
        'accent': '#8BC53F',     // bemytech-green
      },
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 