import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const DEFAULT_CONFIG = {
  components,
  directives,
  icons: {
    iconfont: 'mdi',
  },
  breakpoint: {
    mobileBreakpoint: 480,
    thresholds: {
      xs: 480,
      sm: 768,
      md: 992,
      lg: 1200,
    },
  },
}

export const vuetify = createVuetify(
  DEFAULT_CONFIG
)

export default {
  vuetify
}