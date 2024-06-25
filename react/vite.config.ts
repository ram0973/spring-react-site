import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    mkcert(),
  ],
  server: {
    // change for CORS
    proxy: {
      '/api': {
        target: 'http://localhost:8080/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    https: true
  }
})
