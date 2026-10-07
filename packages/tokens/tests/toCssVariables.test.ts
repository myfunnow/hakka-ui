import { toCssVariables } from '@/toCssVariables'

describe('toCssVariables', () => {
  it('should declare the color and its rgb channels as variables on :root for every entry', () => {
    const css = toCssVariables({ primary: '#ff5537', 'text-default': '#252729' })

    expect(css).toBe(
      [
        ':root {',
        '  --hk-color-primary: #ff5537;',
        '  --hk-color-primary-rgb: 255 85 55;',
        '  --hk-color-text-default: #252729;',
        '  --hk-color-text-default-rgb: 37 39 41;',
        '}',
        '',
      ].join('\n')
    )
  })
})
