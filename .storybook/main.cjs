const vuetify = require('@vuetify/vite-plugin')

module.exports = {
  "stories": [
    "../src/**/*.stories.mdx",
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    'storybook-dark-mode',
  ],
  "framework": "@storybook/vue3",
  "core": {
    "builder": "@storybook/builder-vite"
  },
  async viteFinal(config, { configType }) {

    config.resolve.alias['~storybook'] = path.resolve(__dirname)
    config.resolve.alias['@'] = path.resolve(__dirname, '..', 'src')

    config.css = {
      preprocessorOptions: {
        scss: { additionalData: `@import "src/style/main.scss";` },
      },
    };

    config.plugins = [
      ...config.plugins,
      vuetify()
    ];

    return config;
  }
}