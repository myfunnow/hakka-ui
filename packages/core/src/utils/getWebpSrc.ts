// Mirrors the build-time generator in @myfunnow/web-core-optimize-images: every png/jpg/jpeg
// under the Nuxt public output gets a sibling .webp. hakka-ui is public, so it can't depend on
// that private package and keeps this small rule in step by hand.
const RASTER_IMAGE_PATTERN = /\.(png|jpe?g)$/i
const ABSOLUTE_URL_PATTERN = /^https?:\/\//i

export interface WebpEnvironment {
  /** webp files only exist in a production build */
  isDev: boolean
  /** Nuxt's `cdnURL || baseURL`, the prefix of every public file and built asset */
  publicBase?: string
}

function isRootRelative(src: string): boolean {
  return src.startsWith('/') && !src.startsWith('//')
}

function isUnderPublicBase(src: string, publicBase?: string): boolean {
  // A relative base (the default '/') is already covered by isRootRelative
  if (!publicBase || !ABSOLUTE_URL_PATTERN.test(publicBase)) {
    return false
  }

  // Compare with a trailing slash so `/prod-staging/...` doesn't match the base `/prod`
  return src.startsWith(publicBase.endsWith('/') ? publicBase : `${publicBase}/`)
}

/** The webp twin of `src` when the app's build generated one, otherwise undefined. */
export function getWebpSrc(src: string, { isDev, publicBase }: WebpEnvironment): string | undefined {
  if (isDev || !RASTER_IMAGE_PATTERN.test(src)) {
    return undefined
  }

  if (!isRootRelative(src) && !isUnderPublicBase(src, publicBase)) {
    return undefined
  }

  return src.replace(/\.\w+$/, '.webp')
}

/** Reads the running app: Nuxt registers `__publicAssetsURL` on both the server and the client. */
export function readWebpEnvironment(): WebpEnvironment {
  const { __publicAssetsURL } = globalThis as { __publicAssetsURL?: () => string }

  return {
    // Same flag Vue uses: bundlers replace it on the client, Node provides it during SSR
    isDev: process.env.NODE_ENV !== 'production',
    publicBase: __publicAssetsURL?.(),
  }
}
