import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist" // <- tu wskazujemy folder dla Vercel
  },
  server: {
    host: true
  },
  preview: {
    host: true
  }
});
