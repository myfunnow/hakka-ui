import { cn, toCssSize } from '@/utils/css'

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

describe('cn', () => {
  it.each([
    { name: 'let the last conflicting utility win', input: ['p-2 flex', 'p-4'], expected: 'flex p-4' },
    {
      name: 'let a downstream overflow replace the default one',
      input: ['overflow-hidden relative', 'overflow-visible'],
      expected: 'relative overflow-visible',
    },
    { name: 'let the last arbitrary color win', input: ['bg-[color:var(--a)]', 'bg-[color:var(--b)]'], expected: 'bg-[color:var(--b)]' },
    { name: 'join arrays and objects like Vue does', input: ['a', ['b', { c: true, d: false }]], expected: 'a b c' },
    { name: 'skip empty values', input: ['text-center', undefined, null, false, ''], expected: 'text-center' },
  ])('should $name', ({ input, expected }) => {
    const result = cn(...input)

    expect(result).toBe(expected)
  })
})
