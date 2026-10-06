import { defineConfig, type UserConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

type PackageTsdownOptions = UserConfig & {
  /** Compile Vue SFCs */
  vue?: boolean
}

/**
 * tsdown config for one workspace package. Run from the package directory.
 *
 * Any tsdown option overrides the shared default, except `plugins`, which run after the Vue plugin.
 */
export function createPackageTsdownConfig({ vue = false, plugins = [], ...overrides }: PackageTsdownOptions = {}): UserConfig {
  return defineConfig({
    // Paths must start with ./ or tsdown resolves them from the workspace root and still exits 0
    entry: { index: './src/index.ts' },
    format: ['esm'],
    platform: 'neutral',
    // Without this, output becomes .mjs/.d.mts and no longer matches package.json exports
    fixedExtension: false,
    dts: vue ? { vue: true } : true,
    ...overrides,
    plugins: vue ? [Vue({ isProduction: true }), plugins] : plugins,
  })
}
