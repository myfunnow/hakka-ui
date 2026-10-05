import { toCssSize } from '@/utils/css'

describe('toCssSize', () => {
  it.each([
    [16, '16px'],
    [0, '0px'],
    ['16', '16px'],
  ])('should add px to the bare number %j', (size, expected) => {
    const result = toCssSize(size)

    expect(result).toBe(expected)
  })

  it.each(['100%', 'auto', '12rem'])('should pass %s through to CSS', size => {
    const result = toCssSize(size)

    expect(result).toBe(size)
  })

  it.each([undefined, ''])('should return undefined for %j', size => {
    const result = toCssSize(size)

    expect(result).toBeUndefined()
  })
})
