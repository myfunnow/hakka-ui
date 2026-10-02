import { defineConfig, type UserConfig } from 'tsdown'
import Vue from 'unplugin-vue/rolldown'

interface PackageTsdownOptions {
  /** Paths must start with ./ or tsdown resolves them from the workspace root and still exits 0 */
  entry?: Record<string, string>
  /** Compile Vue SFCs. Scoped styles are extracted into dist/style.css when the package has @tsdown/css */
  vue?: boolean
  plugins?: NonNullable<UserConfig['plugins']>[]
}

/** tsdown config for one workspace package. Run from the package directory. */
export function createPackageTsdownConfig({ entry = { index: './src/index.ts' }, vue = false, plugins = [] }: PackageTsdownOptions = {}): UserConfig {
  return defineConfig({
    entry,
    format: ['esm'],
    platform: 'neutral',
    // Without this, output becomes .mjs/.d.mts and no longer matches package.json exports
    fixedExtension: false,
    dts: vue ? { vue: true } : true,
    plugins: vue ? [Vue({ isProduction: true }), ...plugins] : plugins,
  })
}
