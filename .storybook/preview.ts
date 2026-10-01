import '../src/assets/styles/main.scss'
import 'virtual:uno.css'

export const tags = ['autodocs']

export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  story => ({
    components: { story },
    template: '<story />',
  }),
]
