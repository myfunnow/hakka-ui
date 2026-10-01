// @vitest-environment node
// Reads the SFC from disk; DOM test environments give import.meta.url an http scheme
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/components/HkPagination/HkPagination.vue', import.meta.url), 'utf8')

describe('HkPagination styles', () => {
  it('should keep a visible focus ring when no brand CSS is loaded', () => {
    const focusRule = source.match(/:focus-visible\s*\{([^}]*)\}/)?.[1] ?? ''

    expect(focusRule).toMatch(/outline:[^;]*var\(--hk-color-primary,\s*currentColor\)/)
  })
})
