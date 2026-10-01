import { resolve } from 'path'
import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import svgLoader from 'vite-svg-loader'

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(import.meta.dirname, 'src/index.ts'),
      formats: ['es'],
      // the proper extensions will be added
      fileName: 'index',
      cssFileName: 'style',
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: ['vue', 'unocss', 'naive-ui'],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true,
      },
    }),
    // Consumers don't run UnoCSS, so inline each SFC's utilities into its own scoped style
    UnoCSS({ mode: 'vue-scoped' }),
    svgLoader({
      svgoConfig: {
        plugins: ['prefixIds'],
      },
    }),
  ],
})
