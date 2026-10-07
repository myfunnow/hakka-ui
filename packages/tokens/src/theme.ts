// Colors for the `theme.colors` of a utility-class engine, so `bg-hk-primary`, `bg-hk-primary/50` and
// `bg-hk-primary bg-opacity-40` all work. The variables come from the brand CSS (`--hk-color-<name>-rgb`).
// Pass the semantic colors of the brand: only the names are used.

/** `{ opacityValue }` is how Tailwind v2 style engines (windicss) ask a color for its opacity. */
export type OpacityFunctionColor = (options: { opacityValue?: string | number }) => string

const channelsOf = (name: string) => `var(--hk-color-${name}-rgb)`

/** `rgb(var(...) / <alpha-value>)`, the Tailwind v3 form. UnoCSS reads it; windicss does not (it prints `<alpha-value>`). */
export function toThemeColors(semanticColors: Record<string, unknown>): Record<string, string> {
  return Object.fromEntries(Object.keys(semanticColors).map(name => [name, `rgb(${channelsOf(name)} / <alpha-value>)`]))
}

/** A function per color, the Tailwind v2 form. windicss reads it. */
export function toThemeColorFunctions(semanticColors: Record<string, unknown>): Record<string, OpacityFunctionColor> {
  return Object.fromEntries(
    Object.keys(semanticColors).map(name => [
      name,
      ({ opacityValue }) => (opacityValue === undefined ? `rgb(${channelsOf(name)})` : `rgb(${channelsOf(name)} / ${opacityValue})`),
    ])
  )
}
