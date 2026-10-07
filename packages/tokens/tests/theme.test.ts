import { createGenerator, presetWind } from 'unocss'

import { semanticColors } from '@/funnow'
import { toThemeColorFunctions, toThemeColors } from '@/theme'

describe('toThemeColors', () => {
  it('should give every semantic color the rgb variable form with an alpha placeholder', () => {
    const colors = toThemeColors({ primary: '#ff5537', 'text-default': '#252729' })

    expect(colors).toEqual({
      primary: 'rgb(var(--hk-color-primary-rgb) / <alpha-value>)',
      'text-default': 'rgb(var(--hk-color-text-default-rgb) / <alpha-value>)',
    })
  })

  it('should let UnoCSS apply a slash opacity and bg-opacity to a semantic color', async () => {
    const uno = await createGenerator({ presets: [presetWind()], theme: { colors: { hk: toThemeColors(semanticColors) } } })

    const { css } = await uno.generate('bg-hk-primary bg-hk-primary/50 bg-opacity-40 text-hk-text-default/30', { preflights: false })

    expect(css).toContain('background-color:rgb(var(--hk-color-primary-rgb) / var(--un-bg-opacity))')
    expect(css).toContain('background-color:rgb(var(--hk-color-primary-rgb) / 0.5)')
    expect(css).toContain('--un-bg-opacity:0.4')
    expect(css).toContain('color:rgb(var(--hk-color-text-default-rgb) / 0.3)')
  })
})

describe('toThemeColorFunctions', () => {
  it('should return the plain rgb variable when the class has no opacity', () => {
    const { primary } = toThemeColorFunctions({ primary: '#ff5537' })

    const color = primary({})

    expect(color).toBe('rgb(var(--hk-color-primary-rgb))')
  })

  it.each([{ opacityValue: '0.5' }, { opacityValue: 'var(--tw-bg-opacity)' }])('should put $opacityValue after the slash', ({ opacityValue }) => {
    const { primary } = toThemeColorFunctions({ primary: '#ff5537' })

    const color = primary({ opacityValue })

    expect(color).toBe(`rgb(var(--hk-color-primary-rgb) / ${opacityValue})`)
  })
})
