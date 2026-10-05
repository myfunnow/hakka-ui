import { toCssSize } from '@/utils/toCssSize'

describe('toCssSize', () => {
  it('should add px to a bare number', () => {
    expect(toCssSize(16)).toBe('16px')
    expect(toCssSize(0)).toBe('0px')
  })

  it('should add px to a numeric string', () => {
    expect(toCssSize('16')).toBe('16px')
  })

  it('should pass any other string through to CSS', () => {
    expect(toCssSize('100%')).toBe('100%')
    expect(toCssSize('auto')).toBe('auto')
    expect(toCssSize('12rem')).toBe('12rem')
  })

  it('should return undefined when there is no size', () => {
    expect(toCssSize(undefined)).toBeUndefined()
    expect(toCssSize('')).toBeUndefined()
  })
})
