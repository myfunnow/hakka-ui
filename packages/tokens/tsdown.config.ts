import { createPackageTsdownConfig } from '@myfunnow/hakka-config/tsdown'

export default createPackageTsdownConfig({
  entry: { funnow: './src/funnow.ts', 'internal/toCssVariables': './src/toCssVariables.ts' },
})
