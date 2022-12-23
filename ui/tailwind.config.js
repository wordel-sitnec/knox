module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "media", // or 'media' or 'class'
  theme: {
    extend: {
      height: (theme) => ({
        screen60: "60vh",
        screen65: "65vh",
        screen70: "70vh",
        screen75: "75vh",
        screen80: "80vh",
      }),
    },
  },
  screens: {},
  variants: {
    extend: {},
    outline: ["focus"],
  },
};
