import { colors } from './funnow'

const HEX_COLOR = /^#[0-9a-f]{6}$/

describe('funnow tokens', () => {
  it('should expose every hue as numeric shades of lowercase hex colors', () => {
    const entries = Object.entries(colors)

    expect(entries.length).toBeGreaterThan(0)
    for (const [hue, shades] of entries) {
      for (const [shade, value] of Object.entries(shades)) {
        expect(Number(shade), `${hue}.${shade}`).not.toBeNaN()
        expect(value, `${hue}.${shade}`).toMatch(HEX_COLOR)
      }
    }
  })
})
