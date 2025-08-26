import { createEslintConfig } from '@myfunnow/web-core/configs'

export default createEslintConfig(undefined, [
  {
    rules: {
      'prettier/prettier': 'off',
    },
  },
])
