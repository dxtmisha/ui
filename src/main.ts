import { createApp } from 'vue'

import './registerServiceWorker'
import './main.scss'

import App from './App.vue'
import ui from '../ui'
import router from './router'
import store from './store'

import md2 from './../md2/properties.json'

import './assets/tailwind.css'

createApp(App)
  .use(ui, {
    designs: [md2]
  })
  .use(store)
  .use(router)
  .mount('#app')
