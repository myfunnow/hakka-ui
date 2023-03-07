import { createApp } from 'vue'

import { vuetify } from './plugins/vuetify'
import App from './app.vue'

import zd from './index.js'

import 'virtual:windi.css'
import './assets/styles/main.scss'


createApp(App).use(vuetify).use(zd).mount('#app')
