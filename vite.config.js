import { defineConfig } from 'vite'

import vue from '@vitejs/plugin-vue'
import WindiCSS from 'vite-plugin-windicss'
import vuetify from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vuetify(), WindiCSS()],
})
