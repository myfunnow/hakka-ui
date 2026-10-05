import { getPageItems, type PageItem } from '@/utils/pagination'

const pages = (...numbers: number[]): PageItem[] => numbers.map(page => ({ type: 'page', page }))
const start: PageItem = { type: 'ellipsis', key: 'start' }
const end: PageItem = { type: 'ellipsis', key: 'end' }

describe('getPageItems', () => {
  it.each([
    { name: 'list every page when they fit in the slot', input: { page: 2, pageCount: 6, pageSlot: 7 }, expected: pages(1, 2, 3, 4, 5, 6) },
    {
      name: 'show the head pages and the last page near the start',
      input: { page: 4, pageCount: 20, pageSlot: 7 },
      expected: [...pages(1, 2, 3, 4, 5), end, ...pages(20)],
    },
    {
      name: 'center the current page between two ellipses in the middle',
      input: { page: 10, pageCount: 20, pageSlot: 7 },
      expected: [...pages(1), start, ...pages(9, 10, 11), end, ...pages(20)],
    },
    {
      name: 'show the first page and the tail pages near the end',
      input: { page: 17, pageCount: 20, pageSlot: 7 },
      expected: [...pages(1), start, ...pages(16, 17, 18, 19, 20)],
    },
    {
      name: 'keep the current page visible with an even slot',
      input: { page: 10, pageCount: 20, pageSlot: 6 },
      expected: [...pages(1), start, ...pages(10, 11), end, ...pages(20)],
    },
    {
      name: 'treat a slot below 5 as 5',
      input: { page: 10, pageCount: 20, pageSlot: 3 },
      expected: [...pages(1), start, ...pages(10), end, ...pages(20)],
    },
    {
      name: 'clamp a page beyond the last page',
      input: { page: 99, pageCount: 20, pageSlot: 7 },
      expected: [...pages(1), start, ...pages(16, 17, 18, 19, 20)],
    },
    { name: 'return a single page when there is at most one page', input: { page: 1, pageCount: 0, pageSlot: 7 }, expected: pages(1) },
  ])('should $name', ({ input, expected }) => {
    const result = getPageItems(input)

    expect(result).toEqual(expected)
  })
})
