import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from'vite-plugin-mkcert'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //mkcert(),
  ],
  server: {
    https: false,
    proxy: {
      '/upload': {
       target: 'http://localhost:8080',
       changeOrigin: true,
       // rewrite: (path) => path.replace(/^\/static/, '')
      }
   },
  }
})
