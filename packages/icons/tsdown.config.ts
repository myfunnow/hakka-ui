import { createPackageTsdownConfig } from '@myfunnow/hakka-config/tsdown'
import svgLoader from 'vite-svg-loader'

export default createPackageTsdownConfig({
  vue: true,
  // Lets the app's UnoCSS scan this file, so the default classes of HkIcon get their CSS (same as hakka-core).
  banner: '/* @unocss-include */',
  plugins: [svgLoader({ svgoConfig: { plugins: ['prefixIds'] } })],
})
