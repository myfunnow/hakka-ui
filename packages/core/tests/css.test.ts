import { cn, toCssLength, toCssUrl } from '@/utils/css'

describe('toCssLength', () => {
  it.each([
    [16, '16px'],
    [0, '0px'],
    ['16', '16px'],
  ])('should add px to the bare number %j', (size, expected) => {
    const result = toCssLength(size)

    expect(result).toBe(expected)
  })

  it.each(['100%', 'auto', '12rem'])('should pass %s through to CSS', size => {
    const result = toCssLength(size)

    expect(result).toBe(size)
  })

  it.each([undefined, ''])('should return undefined for %j', size => {
    const result = toCssLength(size)

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

describe('toCssUrl', () => {
  it.each([
    { name: 'a plain url', src: '/images/logo.svg', expected: 'url("/images/logo.svg")' },
    {
      name: 'an absolute url',
      src: 'https://cdn.myfunnow.com/eatigo-web/prod/images/logo.svg',
      expected: 'url("https://cdn.myfunnow.com/eatigo-web/prod/images/logo.svg")',
    },
    { name: 'a url with spaces and parentheses', src: '/images/my logo (1).svg', expected: 'url("/images/my logo (1).svg")' },
    { name: 'a double quote that would end the string', src: '/a".svg', expected: 'url("/a\\".svg")' },
    { name: 'a backslash', src: '/a\\b.svg', expected: 'url("/a\\\\b.svg")' },
  ])('should quote $name', ({ src, expected }) => {
    const result = toCssUrl(src)

    expect(result).toBe(expected)
  })
})
