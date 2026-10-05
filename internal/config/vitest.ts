import { defineProject, mergeConfig } from 'vitest/config'

import viteConfig from '../../vite.config.ts'

/**
 * Vitest project config for one workspace package.
 *
 * `@/` comes from the nearest tsconfig of the importing file (see tsconfig.package.json), so every
 * package resolves it to its own `src/` without colliding with the others.
 */
export function createPackageVitestConfig() {
  return mergeConfig(
    viteConfig,
    defineProject({
      resolve: { tsconfigPaths: true },
      test: {
        globals: true,
        environment: 'happy-dom',
        include: ['tests/**/*.test.ts'],
      },
    })
  )
}
