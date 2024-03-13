import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import path from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~bootstrap': path.resolve(__dirname, 'node_modules/bootstrap'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  server: {
    proxy: {
      "/config": process.env.BASE_URL || "http://localhost:8080",
      "/save": process.env.BASE_URL || "http://localhost:8080"
    }
  }
})
