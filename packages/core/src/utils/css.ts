import { extendTailwindMerge } from 'tailwind-merge'
import { normalizeClass } from 'vue'

// UnoCSS (presetWind) also understands a plain number as a ratio (`aspect-1`, `aspect-1.8`), but tailwind-merge only knows
// `aspect-square`, `aspect-video` and `aspect-[...]`. Without this, `aspect-1` would not replace the default `aspect-[1.8]`.
const twMerge = extendTailwindMerge({ extend: { classGroups: { aspect: [{ aspect: [(value: string) => /^\d+(\.\d+)?$/.test(value)] }] } } })

/** Joins any class value Vue accepts, then lets the last conflicting utility win (`p-2 p-4` becomes `p-4`). */
export function cn(...classes: unknown[]): string {
  return twMerge(normalizeClass(classes))
}

/** A CSS `url()` with the address quoted, so a quote or backslash in it cannot end the string. */
export function toCssUrl(src: string): string {
  return `url("${src.replace(/(["\\])/g, '\\$1')}")`
}
