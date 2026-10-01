import { createEslintConfig } from '@myfunnow/web-core-config-lint'

export default createEslintConfig(
  {},
  // Build output of every package is compiled code, not source
  { ignores: ['packages/*/dist/**'] },
  {
    // `@/` only resolves in tests. tsdown may emit it unresolved into published .d.ts files,
    // and the root Storybook cannot tell which package's src/ it means.
    files: ['packages/*/src/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ group: ['@/*'], message: 'Use a relative import inside src/. `@/` is for tests only.' }] }],
    },
  }
)
