module.exports = {
  content: ["./public/index.html", "./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        gray: {
          light: "rgba(255, 255, 255, 0.6)",
          DEFAULT: "#4b5053",
          dark: "#373c3f",
          darker: "#2f3437",
        },
      },
      translate: {
        negative: "-100%",
      },
      maxWidth: {
        screen: "100vw",
      },
      minHeight: {
        32: "8rem",
      },
      spacing: {
        negative: "-1px",
      },
    },
  },
  plugins: [],
};

//  npx tailwindcss -o ./src/assets/style.css -w -m
