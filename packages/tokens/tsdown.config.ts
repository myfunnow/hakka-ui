import { defineConfig } from 'tsdown'

export default defineConfig({
  // Paths must start with ./ or tsdown resolves them from the workspace root and still exits 0
  entry: { funnow: './src/funnow.ts' },
  format: ['esm'],
  platform: 'neutral',
  // Without this, output becomes .mjs/.d.mts and no longer matches package.json exports
  fixedExtension: false,
  dts: true,
})
