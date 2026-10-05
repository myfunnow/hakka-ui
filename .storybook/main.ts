import type { StorybookConfig } from '@storybook/vue3-vite'
import { presetWind } from 'unocss'
import UnoCSS from 'unocss/vite'

const config: StorybookConfig = {
  stories: ['../packages/*/src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', 'storybook-dark-mode'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  async viteFinal(config) {
    config.base = process.env.BASE_PATH || config.base
    // `@/` is each package's own src/, taken from the tsconfig nearest to the importing file
    config.resolve = { ...config.resolve, tsconfigPaths: true }
    // Same engine and preset the apps use; the default pipeline already scans every .vue file under packages/*/src
    config.plugins = [...(config.plugins ?? []), UnoCSS({ presets: [presetWind()] })]

    return config
  },
}

export default config
