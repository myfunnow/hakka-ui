import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import vuetify from 'vite-plugin-vuetify'

const resolve = (str) => path.resolve(__dirname, str)

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('src'),
    }
  },
  plugins: [vue(), vuetify(), WindiCSS()],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
})
