export interface HkPaginationProps {
  /** The page that is shown now. The first page is 1. Use it as v-model:page so the page changes when someone clicks. Default: 1. */
  page?: number
  /** How many results there are in total, over all pages. */
  totalCount: number
  /** How many results one page shows. Default: 10. */
  pageSize?: number
  /** How many page buttons show at once. The rest become "…". Default: 7. */
  visible?: number
  /** Text that screen readers read for the whole bar (nav) and for the two arrow buttons (prev, next). Default is Traditional Chinese. */
  ariaLabels?: { nav?: string; prev?: string; next?: string }
}

export interface HkPaginationEmits {
  /** The person picked another page. */
  (event: 'update:page', page: number): void
}

export interface HkPaginationSlots {
  /** Replaces the line "第 1 - 10，共 200 筆結果" above the buttons. It gets start, end and total to build its own text. */
  text?(props: { start: number; end: number; total: number }): unknown
}
