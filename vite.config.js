import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // In development, form submissions go to the email server (npm run server)
  server: {
    proxy: { '/api': 'http://localhost:3001' },
  },
})
