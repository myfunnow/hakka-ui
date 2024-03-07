import * as components from '../components'


function install(app, options = {}) {
  for (const prop in components) {
    app.component(prop, components[prop])
  }
}

const plugin = {
  install
}

export default plugin
