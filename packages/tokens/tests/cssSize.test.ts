import { gzipSync } from 'node:zlib'

import { semanticColors } from '@/funnow'
import { toCssVariables } from '@/toCssVariables'

// The brand CSS is loaded by every page before the first paint, so it should stay small even when it holds every
// semantic color. When this fails, split the CSS by token group (hakka components need one group, apps opt into the
// rest) and make the `-rgb` variables an extra file, instead of raising the number.
const GZIP_BUDGET_BYTES = 3 * 1024

describe('brand CSS size', () => {
  it('should stay within the gzip budget', () => {
    const css = toCssVariables(semanticColors)

    const gzipBytes = gzipSync(css).length

    expect(gzipBytes).toBeLessThan(GZIP_BUDGET_BYTES)
  })
})
