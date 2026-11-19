import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: '/lab_codes/', // GitHub Pages 경로 (repo 이름)
  plugins: [react()],
})
