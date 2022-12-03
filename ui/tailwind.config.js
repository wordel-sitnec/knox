module.exports = {
  mode: 'jit',
  purge: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      height: theme => ({
        "screen75": "75vh",
        "screen80": "80vh",
        "screen60": "60vh"
      }),
    },
  },
  screens: {},
  variants: {
    extend: {},
    outline: ["focus"],
  },
};
