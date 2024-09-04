import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: "dist",
    assetsDir: "src/assets",
  },
  assetsInclude: ['**/*.jpg'],
  plugins: [react()],
  publicDir: 'src/assets', // Add this line
})
