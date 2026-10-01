import path from 'node:path'
import type { StorybookConfig } from '@storybook/vue3-vite'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-docs', 'storybook-dark-mode'],

  framework: {
    name: '@storybook/vue3-vite',
    options: {},
  },

  async viteFinal(config) {
    config.base = process.env.BASE_PATH || config.base
    if (!config.resolve) config.resolve = {}
    if (!config.resolve.alias) config.resolve.alias = {}
    config.resolve.alias['~storybook'] = import.meta.dirname
    config.resolve.alias['@'] = path.resolve(import.meta.dirname, '..', 'src')

    config.plugins = [...(config.plugins || [])]

    return config
  },
}

export default config
