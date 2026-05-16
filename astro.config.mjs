import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // Si deseas probar el modo estático puro para descartar errores:
  output: 'static', 
  integrations: [
    vue()
  ],
  vite: {
    plugins: [tailwindcss()],
  },
})
