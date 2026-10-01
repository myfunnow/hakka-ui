// @vitest-environment node
// Reads the svg directory from disk; jsdom gives import.meta.url an http scheme
import { readdirSync } from 'node:fs'

import { iconMap } from '@/iconMap'

describe('iconMap', () => {
  it('should have exactly one entry per svg file', () => {
    const svgNames = readdirSync(new URL('../src/svg', import.meta.url))
      .filter(file => file.endsWith('.svg'))
      .map(file => file.slice(0, -'.svg'.length))
      .sort()

    const mapNames = Object.keys(iconMap).sort()

    expect(mapNames).toEqual(svgNames)
  })
})
