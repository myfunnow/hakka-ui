import type { CssSize } from '@/types/css'

/** Like v-img: a bare number (or numeric string) gets px, any other string goes to CSS as is. */
export function toCssSize(size?: CssSize): string | undefined {
  if (size === undefined || size === '') {
    return undefined
  }

  return Number.isNaN(Number(size)) ? `${size}` : `${size}px`
}
