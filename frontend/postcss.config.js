// frontend/postcss.config.js

export default {
  plugins: {
    // استخدام حزمة @tailwindcss/postcss الجديدة
    // هذا يحل مشكلة "tailwindcss directly as a PostCSS plugin"
    '@tailwindcss/postcss': {},
    autoprefixer: {}, // Autoprefixer لا يزال ضروريًا
  },
};
