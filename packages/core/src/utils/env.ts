/**
 * Same flag Vue reads: bundlers replace the expression on the client and Node provides it during SSR.
 * A function, not a constant, so a test can change NODE_ENV after the module is loaded.
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production'
}
