import type { Component } from 'vue'

import type { IconName } from './iconNames'

// Same props as web-core's FunNowSvgIcon so moving it here is a rename
export interface HkIconProps {
  name: IconName
  size?: string | number
  width?: string | number
  height?: string | number
  svgComponent?: Component
}
