import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // base: '/' is required when using a custom GoDaddy domain with GitHub Pages.
  // If you ever deploy WITHOUT a custom domain (e.g. username.github.io/repo-name),
  // change this to: base: '/your-repo-name/'
  base: '/',
})
