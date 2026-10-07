const HEX_COLOR = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i

/** `#ff5537` becomes `255 85 55`, the form `rgb(<channels> / <alpha>)` takes. Only the 6 digit form is accepted. */
export function hexToRgbChannels(hex: string): string {
  const match = HEX_COLOR.exec(hex)

  if (!match) {
    throw new Error(`Expected a 6 digit hex color such as #ff5537, got "${hex}"`)
  }

  const [, red, green, blue] = match

  return [red, green, blue].map(channel => parseInt(channel, 16)).join(' ')
}
