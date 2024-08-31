import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/React-Projects/Clock",
  css: {
    preprocessorOptions: {
      scss: {
        // Optional: Include global SCSS variables or mixins here
        additionalData: '@import "src/styles/main.scss";',
      },
      build: {
        sourcemap: true, // Disable source maps for CSS and JS in production
      },
    },
  },
});
