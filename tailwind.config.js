/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        'viewer-fadein': {
          '0%': { opacity: '0', transform: 'translateY(4px) scale(0.96)' },
          '100%': { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
        'pulse-dot': {
          '0%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0.7)' },
          '60%': { boxShadow: '0 0 0 6px rgba(34, 197, 94, 0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(34, 197, 94, 0)' },
        },
        'roll-in': {
          '0%': { transform: 'translateY(110%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'spin-slow-anim': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'modal-zoom-in': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'audition-fadein': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'audition-slidein': {
          '0%': { transform: 'translateY(28px) scale(0.97)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        'audition-pop': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      animation: {
        scroll: 'scroll 70s linear infinite',
        'viewer-fadein': 'viewer-fadein 0.5s ease both',
        'pulse-dot': 'pulse-dot 1.8s ease-in-out infinite',
        'roll-in': 'roll-in 0.42s cubic-bezier(0.22, 1, 0.36, 1) both',
        'spin-slow': 'spin-slow-anim 12s linear infinite',
        'modal-zoom-in': 'modal-zoom-in 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'audition-fadein': 'audition-fadein 0.2s ease both',
        'audition-slidein': 'audition-slidein 0.3s cubic-bezier(0.16, 1, 0.3, 1) both',
        'audition-pop': 'audition-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) both'
      },
      fontFamily: {
        oswald: ["Oswald", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        nerko: ["Nerko One", "cursive"],
        playwrite: ["Playwrite GB S", "cursive"],
        edu: ["Edu AU VIC WA NT Guides", "cursive"],
      }
    },
  },
  plugins: [],
}