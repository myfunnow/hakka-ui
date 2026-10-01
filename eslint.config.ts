import { createEslintConfig } from '@myfunnow/web-core-config-lint'

// Build output of every package is compiled code, not source
export default createEslintConfig({}, { ignores: ['packages/*/dist/**'] })
