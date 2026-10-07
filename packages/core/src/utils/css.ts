import { twMerge } from 'tailwind-merge'
import { normalizeClass } from 'vue'

import type { CssSize } from '@/types/css'

/** Like v-img: a bare number (or numeric string) gets px, any other string goes to CSS as is. */
export function toCssSize(size?: CssSize): string | undefined {
  if (size === undefined || size === '') {
    return undefined
  }

  return Number.isNaN(Number(size)) ? `${size}` : `${size}px`
}

/** Joins any class value Vue accepts, then lets the last conflicting utility win (`p-2 p-4` becomes `p-4`). */
export function cn(...classes: unknown[]): string {
  return twMerge(normalizeClass(classes))
}

/** A CSS `url()` with the address quoted, so a quote or backslash in it cannot end the string. */
export function toCssUrl(src: string): string {
  return `url("${src.replace(/(["\\])/g, '\\$1')}")`
}
