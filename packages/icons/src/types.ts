import type { Component } from 'vue'

import type { IconName } from './iconNames'

// Same props as web-core's FunNowSvgIcon so moving it here is a rename
export interface HkIconProps {
  /** Which icon to show. */
  name: IconName
  /** Width and height together, for example 24 or "2rem". A number means pixels. When set, width and height are ignored. */
  size?: string | number
  /** Width of the icon. A number means pixels, text is used as it is. Default: 100% (as wide as its box). */
  width?: string | number
  /** Height of the icon. A number means pixels, text is used as it is. Default: 100% (as tall as its box). */
  height?: string | number
  /** Show your own icon component instead of one from the list. Only for code, it cannot be set here. */
  svgComponent?: Component
}
