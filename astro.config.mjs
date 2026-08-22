import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import node from '@astrojs/node'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Modo híbrido para permitir endpoints dinámicos (API routes)
  output: 'server', 
  adapter: node({ mode: 'standalone' }),
  integrations: [
    vue()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
