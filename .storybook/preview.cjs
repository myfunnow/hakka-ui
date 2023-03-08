import { app } from "@storybook/vue3";
import { vuetify } from '../src/plugins/vuetify'

import '../src/assets/styles/main.scss'

app.use(vuetify)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (story) => ({
    components: { story },
    template: '<v-app><story /></v-app>',
  }),
];