// @vitest-environment node
// Reads the SFC from disk; DOM test environments give import.meta.url an http scheme
import { readFileSync } from 'node:fs'

const source = readFileSync(new URL('../src/components/HkPagination/HkPagination.vue', import.meta.url), 'utf8')

describe('HkPagination styles', () => {
  it('should keep a visible focus ring when no brand CSS is loaded', () => {
    expect(source).toContain('focus-visible:outline-[color:var(--hk-color-primary,currentColor)]')
  })

  it('should not depend on a scoped stylesheet', () => {
    expect(source).not.toMatch(/<style[\s>]/)
  })
})
