import { cn } from '@/cn'

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
    { name: 'let a numeric aspect ratio replace an arbitrary one', input: ['aspect-[1.8]', 'aspect-1'], expected: 'aspect-1' },
    { name: 'let a decimal aspect ratio replace aspect-square', input: ['aspect-square', 'aspect-1.8'], expected: 'aspect-1.8' },
    { name: 'let aspect-video replace a numeric aspect ratio', input: ['aspect-2', 'aspect-video'], expected: 'aspect-video' },
    { name: 'skip empty values', input: ['text-center', undefined, null, false, ''], expected: 'text-center' },
  ])('should $name', ({ input, expected }) => {
    const result = cn(...input)

    expect(result).toBe(expected)
  })
})
