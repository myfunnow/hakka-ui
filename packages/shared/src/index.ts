/**
 * A length for CSS: a number or a numeric string means px, any other string goes to CSS as is ("50%", "20rem", "auto").
 * Same rule as `convertToUnit` of Vuetify, so a `v-img` call site can move over unchanged.
 */
export type CssLength = string | number

/** A ratio of width to height: `1.8`, `"1.8"` or `"16/9"`. */
export type AspectRatio = string | number
