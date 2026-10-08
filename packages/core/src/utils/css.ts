import { twMerge } from 'tailwind-merge'
import { normalizeClass } from 'vue'

/** Joins any class value Vue accepts, then lets the last conflicting utility win (`p-2 p-4` becomes `p-4`). */
export function cn(...classes: unknown[]): string {
  return twMerge(normalizeClass(classes))
}

/** A CSS `url()` with the address quoted, so a quote or backslash in it cannot end the string. */
export function toCssUrl(src: string): string {
  return `url("${src.replace(/(["\\])/g, '\\$1')}")`
}
