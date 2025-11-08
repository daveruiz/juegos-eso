const themeFontFamily = ["Inter", "system-ui", "-apple-system", "sans-serif"];

tailwind.config = {
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#7dd3fc",
          DEFAULT: "#38bdf8",
          dark: "#0ea5e9",
          foreground: "#f8fafc",
        },
      },
      fontFamily: {
        sans: themeFontFamily,
      },
    },
  },
};
