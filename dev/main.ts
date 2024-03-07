import { createApp } from 'vue'

import App from './app.vue'

import zd from '../src'

import '../src/assets/styles/main.scss'
import 'virtual:uno.css'

createApp(App).use(zd).mount('#app')
