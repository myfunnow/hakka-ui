import { createPackageTsdownConfig } from '@myfunnow/hakka-config/tsdown'
import svgLoader from 'vite-svg-loader'

export default createPackageTsdownConfig({
  vue: true,
  plugins: [svgLoader({ svgoConfig: { plugins: ['prefixIds'] } })],
})
