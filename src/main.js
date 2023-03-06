import { createApp } from 'vue'

import { vuetify } from './plugins/vuetify'
import App from './app.vue'

import 'virtual:windi.css'
import './assets/styles/main.scss'


createApp(App).use(vuetify).mount('#app')
