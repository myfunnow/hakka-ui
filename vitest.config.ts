import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Each package has its own project so `@` can point to that package's src/
    projects: ['packages/*/vitest.config.ts'],
  },
})
