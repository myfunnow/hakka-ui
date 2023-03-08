import * as components from './components'

import './assets/styles/main.scss'

function install(Vue) {
  if (install.installed) return
  install.installed = true

  for (const prop in components) {
    const component = components[prop]
    Vue.component(component.name, component)
  }
}

const plugin = {
  install
}

export default plugin
