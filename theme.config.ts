// https://www.figma.com/file/kmqpAxomduhbiuOsSeH4iZ/Niceday---Niceday-2.0?node-id=517%3A19229&t=BcBbcXaVJW6uIFPd-0
export const colors = {
  yellow: {
    80: '#B87E00',
    70: '#D18F00',
    60: '#EBA100',
    50: '#FFB005',
    40: '#FFC037',
    30: '#FFD069',
    20: '#FFE7B4',
    10: '#FFF7E6',
  },
  black: {
    80: '#000000',
    70: '#000000',
    60: '#0D0E0E',
    50: '#252729',
    40: '#3D4144',
    30: '#555A5F',
    20: '#6E7479',
  },

  gray: {
    80: '#747476',
    70: '#8E8E8F',
    60: '#A7A7A9',
    50: '#C1C1C2',
    40: '#DBDBDB',
    30: '#EDEDED',
    20: '#F4F4F5',
    10: '#FFFFFF',
  },
  white: '#FFFFFF',

  purple: {
    80: '#13219B',
    70: '#192BC7',
    60: '#2F42E5',
    50: '#5A69EB',
    40: '#8993F1',
    30: '#B6BDF6',
    20: '#CDD1F9',
    10: '#E4E6FC',
  },
  orange: {
    80: '#C47200',
    70: '#DC8100',
    60: '#F58F00',
    50: '#FF9C10',
    40: '#FFB245',
    30: '#FFDEAF',
    20: '#FFDEAF',
    10: '#FFF4E4',
  },
  beige: {
    60: '#FFE7B0',
    50: '#FFF6E0',
    40: '#FFFAF0',
    30: '#FFFEFC',
  },

  red: {
    80: '#9F161D',
    70: '#D41D26',
    60: '#E22D36',
    50: '#E6474F',
    40: '#EB6C72',
    30: '#F2A3A7',
    20: '#FADADC',
    10: '#FCEDED',
  },

  pink: {
    80: '#A93E56',
    70: '#CD4862',
    60: '#E76478',
    50: '#FF808A',
    40: '#FF99A1',
    30: '#FFB3B9',
    20: '#FFE5E8',
    10: '#FFF2F3',
  },

  green: {
    80: '#13593A',
    70: '#1C8656',
    60: '#26B273',
    50: '#39D58F',
    40: '#61DDA5',
    30: '#88E6BC',
    20: '#C4F2DD',
    10: '#EBFBF4',
  },

  blue: {
    80: '#003E6E',
    70: '#005EA5',
    60: '#007DDC',
    50: '#1499FF',
    40: '#43AEFF',
    30: '#72C2FF',
    20: '#B9E1FF',
    10: '#E8F5FF',
  },

  tangerine: {
    80: '#E82300',
    70: '#FF2F0A',
    60: '#FF4B2B',
    50: '#FF674D',
    40: '#FF8670',
    30: '#FFA494',
    20: '#FFD1C9',
    10: '#FFF0ED',
  },
  fun: '#FF5537',
} as const

export const screens = {
  sm: 600,
  md: 768,
  lg: 960,
  xl: 1280,
} as const

export const typography = {
  // https://github.com/unocss/unocss/blob/154e3a9aaa5407b12cdc55b6b3529d8dfb3400d8/packages/preset-mini/src/_theme/font.ts#LL40C21-L40C21
  // name: [font-size, line-height]
  '4xl': ['52px', '60px'],
  '3xl': ['36px', '44px'],
  '2xl': ['24px', '32px'],
  xl: ['20px', '28px'],
  lg: ['18px', '24px'],
  base: ['16px', '24px'],
  sm: ['14px', '20px'],
  xs: ['12px', '20px'],
} as const

export const zIndex = {
  popover: 2000,
  navbar: 2500,
  modal: 3000,
  navbarPopover: 3600,
  drawer: 4000,
  alert: 5000,
}

export default {
  screens,
  colors,
  typography,
  zIndex,
}
