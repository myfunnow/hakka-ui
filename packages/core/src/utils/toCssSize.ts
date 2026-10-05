/** Like v-img: a bare number (or numeric string) gets px, any other string goes to CSS as is. */
export function toCssSize(size?: string | number): string | undefined {
  if (size === undefined || size === '') {
    return undefined
  }

  return Number.isNaN(Number(size)) ? `${size}` : `${size}px`
}
