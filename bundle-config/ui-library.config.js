import path from 'path'
import { defineConfig } from 'vite'
import { isVue2, version } from 'vue-demi'
import vue2Compiler from 'vue-template-compiler'
import * as vue3Compiler from '@vue/compiler-sfc'
import vue2 from '@vitejs/plugin-vue2'
import vue3 from '@vitejs/plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

import { getOutputDir } from '../scripts/utils.mjs'

const vuePlugin = isVue2 ? vue2 : vue3
const compiler = isVue2 ? vue2Compiler : vue3Compiler
const resolve = (str) => path.resolve(__dirname, str)

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('../src'),
      vue: isVue2 ? resolve('./node_modules/vue2') : resolve('./node_modules/vue3'),
      '@vue/composition-api': resolve('./node_modules/@vue/composition-api')
    }
  },
  build: {
    lib: {
      entry: resolve('../src/index.js'),
      name: 'Zoek-Design',
      formats: ["es", "cjs", "umd"],
      fileName: format => `zoek-design.${format}.js`,
      assetFileNames: (assetInfo) => assetInfo.name,
    },
    rollupOptions: {
      external: ['vue-demi', 'vue'],
      output: {
        dir: getOutputDir(version),
        globals: {
          'vue': 'Vue',
          'vue-demi': 'VueDemi',
        },
      },
    },
    optimizeDeps: {
      exclude: ['vue-demi']
    },
  },
  plugins: [
    vuePlugin({
      compiler,
      compileTemplate: false,
      template: { optimizeSSR: true },
      data: { // This helps to inject variables in each <style> tag of every Vue SFC
        scss: () => `@import "@/assets/styles/main.scss";`,
      },
    }),
    peerDepsExternal(),
  ],
})
