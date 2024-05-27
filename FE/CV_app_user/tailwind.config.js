module.exports = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false,
  },
  mode: 'jit',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        LexendDeca: ['Lexend Deca', 'sans-serif'],
      },
      colors: {
        error: '#ec4c4c',
      },
    },
  },
  plugins: [],
};
