import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import node from '@astrojs/node'
import tailwindcss from '@tailwindcss/vite'

import netlify from '@astrojs/netlify';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'server', 
  adapter: netlify(),
  integrations: [vue(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    // Agrega esto para solucionar el error de HMR del router
    server: {
      watch: {
        ignored: ['**/.astro/**']
      }
    }
  },
})