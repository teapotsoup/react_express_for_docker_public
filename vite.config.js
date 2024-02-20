import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/profile': {
        target: 'http://localhost:5173/',
        changeOrigin: true,
        rewrite: (path) => path === '/profile' ? '/' : path,
      },
      '/specsheet': {
        target: 'http://localhost:5173/',
        changeOrigin: true,
        rewrite: (path) => path === '/specsheet' ? '/' : path,
      },
      // '/': {
      //   target: 'http://localhost:5173/',
      //   changeOrigin: true,
      //   rewrite: (path) => '/',
      // },
    },
  },
});