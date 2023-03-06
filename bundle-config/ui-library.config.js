import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'

export default defineConfig({
  build: {
    lib: {
      entry: "src/index.js",
      name: 'Zoek-Design',
      formats: ["es", "cjs", "umd"],
      fileName: format => `zoek-design.${format}.js`,
      assetFileNames: (assetInfo) => assetInfo.name,
    },
    rollupOptions: {
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  plugins: [
    vue({
      compileTemplate: true,
      template: { optimizeSSR: true },
      data: { // This helps to inject variables in each <style> tag of every Vue SFC
        scss: () => `@import "@/assets/styles/main.scss";`,
      },
    }),
    peerDepsExternal(),
  ],
})
