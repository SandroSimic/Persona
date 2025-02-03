import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Add this alias to resolve '~' to 'node_modules'
      "~": "/node_modules/",
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern"
      },
    },
  }
});
