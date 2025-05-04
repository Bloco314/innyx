import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://laravel_app:8000',
        changeOrigin: true,
        secure: false,
      },
      '/sanctum': {
        target: 'http://laravel_app:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
