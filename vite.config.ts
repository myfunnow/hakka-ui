import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import svgLoader from 'vite-svg-loader'

import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  plugins: [
    vue({
      script: {
        defineModel: true,
        propsDestructure: true, // 解构 props
      },
    }),
    UnoCSS(),
    svgLoader({
      svgoConfig: {
        plugins: ['prefixIds'],
      },
    }),
  ],
})
