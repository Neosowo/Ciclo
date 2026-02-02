import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  // Base path for GitHub Pages - change 'Ciclo' to your repo name
  base: '/Ciclo/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    // Generate sourcemaps for debugging
    sourcemap: false,
    // Ensure clean build
    emptyOutDir: true
  }
})
