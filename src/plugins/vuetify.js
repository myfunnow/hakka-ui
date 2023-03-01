import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export const vuetify = createVuetify({
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
  theme: {
    // themes: {
    //   light: {
    //     ...CUSTOM_COLORS,
    //     error: CUSTOM_COLORS.red50,
    //   },
    // },
  },
})

export default {
  vuetify
}