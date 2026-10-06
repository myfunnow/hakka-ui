import { createPackageTsdownConfig } from '@myfunnow/hakka-config/tsdown'

// The app's UnoCSS scans this file for the utility classes the components use
export default createPackageTsdownConfig({ vue: true, banner: '/* @unocss-include */' })
