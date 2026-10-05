/**
 * Same flag Vue reads: bundlers replace the expression on the client and Node provides it during SSR.
 * It is fixed when the module loads, like Vue's own dev flag.
 */
export const IS_PRODUCTION = process.env.NODE_ENV === 'production'
