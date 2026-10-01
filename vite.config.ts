import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// Used by Storybook and Vitest only. Each package builds itself with tsdown.
export default defineConfig({
  plugins: [vue(), svgLoader({ svgoConfig: { plugins: ['prefixIds'] } })],
})
