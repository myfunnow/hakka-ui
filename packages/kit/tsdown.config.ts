import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

export default defineConfig({
  // Paths must start with ./ or tsdown resolves them from the workspace root and still exits 0
  entry: { index: './src/index.ts' },
  format: ['esm'],
  platform: 'neutral',
  // Without this, output becomes .mjs/.d.mts and no longer matches package.json exports
  fixedExtension: false,
  dts: { vue: true },
  // Scoped styles of every component are extracted into dist/style.css (needs @tsdown/css)
  plugins: [Vue({ isProduction: true })],
})
