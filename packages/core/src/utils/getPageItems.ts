export type PageItem = { type: 'page'; page: number } | { type: 'ellipsis'; key: 'start' | 'end' }

interface GetPageItemsOptions {
  page: number
  pageCount: number
  pageSlot: number
}

const MIN_SLOT = 5

const range = (from: number, to: number): PageItem[] => Array.from({ length: to - from + 1 }, (_, index) => ({ type: 'page', page: from + index }))

/** Page buttons and ellipses to render; the result never exceeds `max(pageSlot, 5)` items. */
export function getPageItems({ page, pageCount, pageSlot }: GetPageItemsOptions): PageItem[] {
  const slot = Math.max(pageSlot, MIN_SLOT)
  const lastPage = Math.max(pageCount, 1)
  const current = Math.min(Math.max(page, 1), lastPage)
  const start: PageItem = { type: 'ellipsis', key: 'start' }
  const end: PageItem = { type: 'ellipsis', key: 'end' }

  if (lastPage <= slot) {
    return range(1, lastPage)
  }

  if (current <= slot - 3) {
    return [...range(1, slot - 2), end, ...range(lastPage, lastPage)]
  }

  if (current >= lastPage - (slot - 4)) {
    return [...range(1, 1), start, ...range(lastPage - (slot - 3), lastPage)]
  }

  const middleStart = current - Math.floor((slot - 5) / 2)

  return [...range(1, 1), start, ...range(middleStart, middleStart + slot - 5), end, ...range(lastPage, lastPage)]
}
