export function toCssVariables(map: Record<string, string>): string {
  const lines = Object.entries(map).map(([name, value]) => `  --hk-color-${name}: ${value};`)

  return `:root {\n${lines.join('\n')}\n}\n`
}
