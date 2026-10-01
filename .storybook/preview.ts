// Components only read --hk-color-* variables, so Storybook loads one brand CSS to define them.
// funnow is the only brand with Figma tokens today. Once a second brand exists, replace this
// with a toolbar brand switcher (needs tokens CSS scoped by [data-brand] instead of :root).
// The storybook scripts build tokens before starting, because this file lives in dist/.
import '../packages/tokens/dist/funnow.css'

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
