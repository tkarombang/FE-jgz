module.exports = {
  content: [
    "./src/**/*.{ts,tsx,js,jsx}",
    "./public/**/*.html", // Sesuaikan dengan struktur proyek Anda
  ],
  theme: {
    extend: {
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
      },
    },

  },
  plugins: [],
}