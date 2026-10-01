import type { Plugin } from 'vue'

import * as components from '../components'

const plugin: Plugin = {
  install(app) {
    for (const [name, component] of Object.entries(components)) {
      app.component(name, component)
    }
  },
}

export { plugin }
