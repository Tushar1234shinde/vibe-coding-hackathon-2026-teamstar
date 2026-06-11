import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        midnight: '#0b1520',
        neongreen: '#32ff9b',
        electric: '#7c3aed',
      },
    },
  },
  plugins: [],
}

export default config
