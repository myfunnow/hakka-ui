import {
  presetIcons,
  presetAttributify,
  presetWind,
  presetWebFonts,
  defineConfig,
  transformerVariantGroup,
  transformerDirectives,
} from 'unocss'

import { colors, screens, typography, zIndex } from './theme.config'

import { mapObjectEntries } from './src/utils/common'

export default defineConfig({
  presets: [
    presetIcons(),
    presetWind(),
    presetAttributify(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        sans: ['Roboto:400,500,700', 'Noto Sans TC'],
      },
    }),
  ],
  theme: {
    fontSize: typography,
    breakpoints: mapObjectEntries(screens, (value) => `${value}px`),
    colors,
  },
  transformers: [
    transformerVariantGroup(),
    transformerDirectives({ enforce: 'pre' }),
  ],
  safelist: ['i-svg-spinners:3-dots-fade'],
  rules: Object.entries(zIndex).map(([key, value]) => [
    `z-${key}`,
    { 'z-index': value },
  ]),
})
