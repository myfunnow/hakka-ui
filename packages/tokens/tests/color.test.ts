import { hexToRgbChannels } from '@/color'

describe('hexToRgbChannels', () => {
  it.each([
    { hex: '#ff5537', channels: '255 85 55' },
    { hex: '#000000', channels: '0 0 0' },
    { hex: '#FFFFFF', channels: '255 255 255' },
  ])('should turn $hex into "$channels"', ({ hex, channels }) => {
    const result = hexToRgbChannels(hex)

    expect(result).toBe(channels)
  })

  it.each(['#fff', '#ff553', '#ff5537aa', 'ff5537', 'orange'])('should reject "%s" because it is not a 6 digit hex color', value => {
    expect(() => hexToRgbChannels(value)).toThrow('6 digit hex color')
  })
})
