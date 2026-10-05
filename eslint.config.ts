import { createEslintConfig } from '@myfunnow/web-core-config-lint'

export default createEslintConfig(
  {},
  // Build output of every package is compiled code, not source
  { ignores: ['packages/*/dist/**'] },
  {
    // `@/` is the package's own src/ (see tsconfig paths), so a parent-relative import is never needed
    files: ['packages/*/src/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ group: ['../*', '../**'], message: 'Use `@/` instead of a parent-relative import.' }] }],
    },
  }
)
