import { defaultClientConditions, defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'

// Used by Storybook and Vitest only. Each package builds itself with tsdown.
export default defineConfig({
  // Workspace packages resolve to src/ so tests, typecheck and Storybook need no prior build
  resolve: { conditions: ['hakka-source', ...defaultClientConditions] },
  plugins: [vue(), svgLoader({ svgoConfig: { plugins: ['prefixIds'] } })],
})
