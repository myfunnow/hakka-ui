import components from'./components/index.js'

const plugin = {
  install (Vue) {
    if (install.installed) return
    install.installed = true
    
    for (const prop in components) {
      if (components.hasOwnProperty(prop)) {
        const component = components[prop]
        Vue.component(component.name, component)
      }
    }
  }
}

export default plugin
