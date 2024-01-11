import * as components from './components'

function install(Vue) {
  // @ts-ignore
  if (install.installed) return
  // @ts-ignore
  install.installed = true

  for (const prop in components) {
    const component = components[prop]
    Vue.component(prop, component)
  }
}

const plugin = {
  install
}

export default plugin
