import { hexToRgbChannels } from '@/color'

/**
 * One `--hk-color-<name>` per color, with the value as written (hakka components read it), and one
 * `--hk-color-<name>-rgb` with the channels (`255 85 55`) so a utility class can apply an opacity to it.
 */
export function toCssVariables(map: Record<string, string>): string {
  const lines = Object.entries(map).flatMap(([name, value]) => [
    `  --hk-color-${name}: ${value};`,
    `  --hk-color-${name}-rgb: ${hexToRgbChannels(value)};`,
  ])

  return `:root {\n${lines.join('\n')}\n}\n`
}
