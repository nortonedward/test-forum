import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',

  icon: {
    clientBundle: {
      scan: true,
    },
  },

  modules: [
    '@cursor-run/nuxt-ui',
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  tailwindcss: {
    configPath: './tailwind.config.ts',
    cssPath: '~/assets/css/main.css',
  },

  fonts: {
    families: [{ name: 'Plus Jakarta Sans', provider: 'google' }],
  },

  // Restart dev server when local @cursor-run/ui package is rebuilt
  watch: [resolve(currentDir, '../test-run/packages/ui/dist')],

  vite: {
    optimizeDeps: {
      // Don't pre-bundle so updates from test-run are picked up on refresh
      exclude: ['@cursor-run/ui'],
    },
  },
});
