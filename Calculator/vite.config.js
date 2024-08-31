import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React-Projects/Calculator",
  css: {
    preprocessorOptions: {
      scss: {
        // Optional: Include global SCSS variables or mixins here
        // additionalData: '@import "./styles/sass/styles.scss";',
      },
      build: {
        sourcemap: true, // Disable source maps for CSS and JS in production
      },
    },
  },
});
