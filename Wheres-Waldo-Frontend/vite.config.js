import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: "assets",
  },
  assetsInclude: ['**/*.jpg'],
  plugins: [react()],
  publicDir: 'public', // Add this line
})
