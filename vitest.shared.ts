import { fileURLToPath } from 'node:url'
import { defineProject, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config.ts'

/**
 * Vitest project config for one workspace package.
 *
 * `@` points to that package's own `src/`, so every package can use `@/` in its tests
 * without colliding with the others. Pass the package's `import.meta.url`.
 */
export function createPackageVitestConfig(packageConfigUrl: string) {
  return mergeConfig(
    viteConfig,
    defineProject({
      resolve: {
        alias: { '@': fileURLToPath(new URL('./src', packageConfigUrl)) },
      },
      test: {
        globals: true,
        environment: 'happy-dom',
        include: ['tests/**/*.test.ts'],
      },
    })
  )
}
