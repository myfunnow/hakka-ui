import { toCssUrl } from '@/utils/css'

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
