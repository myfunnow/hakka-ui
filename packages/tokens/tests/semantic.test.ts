import { semanticColors } from '@/funnow'

const HEX_COLOR = /^#[0-9a-f]{6}$/
const KEBAB = /^[a-z]+(-[a-z]+)*$/

describe('funnow semantic colors', () => {
  it('should map every kebab-case name to a hex color', () => {
    const entries = Object.entries(semanticColors)

    expect(entries.length).toBeGreaterThan(0)
    for (const [name, value] of entries) {
      expect({ name, value }).toEqual({ name: expect.stringMatching(KEBAB), value: expect.stringMatching(HEX_COLOR) })
    }
  })

  it('should use the Figma brand orange as primary', () => {
    expect(semanticColors.primary).toBe('#ff5537')
  })
})
