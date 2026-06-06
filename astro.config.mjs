import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Modo híbrido para permitir endpoints dinámicos (API routes)
  output: 'hybrid', 
  integrations: [
    vue()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
