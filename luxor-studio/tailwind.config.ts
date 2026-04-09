import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Nothing Design System Colors
        'bg-primary': '#000000',
        'bg-secondary': '#0A0A0A',
        'bg-tertiary': '#141414',
        'bg-code': '#1A1A1A',
        'border': '#2A2A2A',
        'border-active': 'rgba(255, 255, 255, 0.2)',
        'text-primary': '#FFFFFF',
        'text-secondary': '#888888',
        'text-tertiary': '#555555',
        'accent': '#FF3B30',
        'accent-secondary': '#00D26A',
        'accent-warning': '#FF9500',
      },
      fontFamily: {
        'display': ['Space Grotesk', 'sans-serif'],
        'mono': ['Space Mono', 'monospace'],
        'body': ['Doto', 'sans-serif'],
      },
      borderRadius: {
        'none': '0px',
      },
      letterSpacing: {
        'luxor': '0.3em',
        'studio': '0.5em',
      }
    },
  },
  plugins: [],
}

export default config
