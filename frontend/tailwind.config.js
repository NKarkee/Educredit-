/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        ocean: "#112f5f",
        mist: "#eef4ff",
        positive: "#15803d",
        warning: "#d97706",
        critical: "#b91c1c",
      },
      fontFamily: {
        sans: ["'Manrope'", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        panel: "0 18px 50px rgba(15, 23, 42, 0.08)",
      },
      backgroundImage: {
        "hero-grid":
          "radial-gradient(circle at top left, rgba(59,130,246,0.18), transparent 30%), radial-gradient(circle at bottom right, rgba(16,185,129,0.12), transparent 24%)",
      },
    },
  },
  plugins: [],
};
