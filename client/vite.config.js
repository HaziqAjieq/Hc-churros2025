import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:5174,
    strictPort:true,
    proxy:{
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
        rewrite:(path) => path,
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port: 5174
      }
    }
  }
})
