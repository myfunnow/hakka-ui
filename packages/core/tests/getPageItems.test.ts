import { getPageItems, type PageItem } from '@/utils/getPageItems'

const pages = (...numbers: number[]): PageItem[] => numbers.map(page => ({ type: 'page', page }))
const start: PageItem = { type: 'ellipsis', key: 'start' }
const end: PageItem = { type: 'ellipsis', key: 'end' }

describe('getPageItems', () => {
  it('should list every page when they fit in the slot', () => {
    expect(getPageItems({ page: 2, pageCount: 6, pageSlot: 7 })).toEqual(pages(1, 2, 3, 4, 5, 6))
  })

  it('should show the head pages and the last page near the start', () => {
    expect(getPageItems({ page: 4, pageCount: 20, pageSlot: 7 })).toEqual([...pages(1, 2, 3, 4, 5), end, ...pages(20)])
  })

  it('should center the current page between two ellipses in the middle', () => {
    expect(getPageItems({ page: 10, pageCount: 20, pageSlot: 7 })).toEqual([...pages(1), start, ...pages(9, 10, 11), end, ...pages(20)])
  })

  it('should show the first page and the tail pages near the end', () => {
    expect(getPageItems({ page: 17, pageCount: 20, pageSlot: 7 })).toEqual([...pages(1), start, ...pages(16, 17, 18, 19, 20)])
  })

  it('should keep the current page visible with an even slot', () => {
    expect(getPageItems({ page: 10, pageCount: 20, pageSlot: 6 })).toEqual([...pages(1), start, ...pages(10, 11), end, ...pages(20)])
  })

  it('should treat a slot below 5 as 5', () => {
    expect(getPageItems({ page: 10, pageCount: 20, pageSlot: 3 })).toEqual([...pages(1), start, ...pages(10), end, ...pages(20)])
  })

  it('should clamp a page beyond the last page', () => {
    expect(getPageItems({ page: 99, pageCount: 20, pageSlot: 7 })).toEqual([...pages(1), start, ...pages(16, 17, 18, 19, 20)])
  })

  it('should return a single page when there is at most one page', () => {
    expect(getPageItems({ page: 1, pageCount: 0, pageSlot: 7 })).toEqual(pages(1))
  })
})
