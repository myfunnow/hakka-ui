import { toCssVariables } from '@/toCssVariables'

describe('toCssVariables', () => {
  it('should declare one --hk-color variable per entry on :root', () => {
    const css = toCssVariables({ primary: '#ff5537', 'text-default': '#252729' })

    expect(css).toBe(':root {\n  --hk-color-primary: #ff5537;\n  --hk-color-text-default: #252729;\n}\n')
  })
})
