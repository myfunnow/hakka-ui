import { defineConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'
import svgLoader from 'vite-svg-loader'

export default defineConfig({
  // Paths must start with ./ or tsdown resolves them from the workspace root and still exits 0
  entry: { index: './src/index.ts' },
  format: ['esm'],
  platform: 'neutral',
  // Without this, output becomes .mjs/.d.mts and no longer matches package.json exports
  fixedExtension: false,
  dts: { vue: true },
  plugins: [Vue({ isProduction: true }), svgLoader({ svgoConfig: { plugins: ['prefixIds'] } })],
})
