# Zoek Design
> A design system for Zoek

## Getting started
### Environment

- Node.js 18.14
- npm 9
- Vue 3

### Install dependencies

```bash
npm install
```

### Run Storybook

```bash
npm run storybook
```

### Build Storybook

```bash
npm run build-storybook
```

### Build the design system

```bash
npm run build
```

### Publish the design system

```bash
npm publish
```

## Development

### Install VSCode extensions

- [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Blueprint](https://marketplace.visualstudio.com/items?itemName=teamchilla.blueprint)

### Create a new component

1. Right click on the `src/components` folder, and select `New File from Template`
2. Select `New Component`
3. Enter the name of the component, then press `Enter`
4. Fill in the component details

### Developer Server

```bash
npm run dev
```

## Usage

> WIP: This package is not yet published to npm, so you will need to install it locally.
### Install the design system

```bash
npm install @zoek/design-system
```

or if you are developing the design system locally, you can install it from a local path:
```bash
$ npm install @zoek/design-system@file:../path/to/design-system
```


### Import the design system

```js
import { createApp } from 'vue'
import App from './App.vue'
import zd from '@zoek/design-system'

// import the styles
import 'zoek-design/dist/assets/styles/main.css'

const app = createApp(App)
app.use(zd)
```

or if you are using Nuxt.js, you can create a plugin:

```js
// /plugins/zoek-design.js
import Vue from 'vue'
import zd from '@zoek/design-system'

import 'zoek-design/dist/assets/styles/main.css'

Vue.use(zd)
```

then add the plugin to your `nuxt.config.js`:

```
// nuxt.config.js
export default {
  plugins: [
    { src: '~/plugins/zoek-design.js' }
  ]
}
```

all components are now available in your app.
