import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // Ensures assets are loaded relative to the WNL repository on Github Pages
  plugins: [react()],
})
