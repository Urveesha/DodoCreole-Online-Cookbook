import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/wpapi': {
        target: 'http://dodo-creole-recipes.free.nf',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/wpapi/, '/wp-json')
      }
    }
  }
})
1