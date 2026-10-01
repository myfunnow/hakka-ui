import { createApp } from 'vue'

import App from './app.vue'

import { plugin } from '@/index'

import '@/assets/styles/main.scss'

createApp(App).use(plugin).mount('#app')
