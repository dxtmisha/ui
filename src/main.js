'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const vue_1 = require('vue')
require('./registerServiceWorker')
const App_vue_1 = __importDefault(require('./App.vue'))
const router_1 = __importDefault(require('./router'))
const store_1 = __importDefault(require('./store'))
require('./main.scss')
require('./assets/tailwind.css');
(0, vue_1.createApp)(App_vue_1.default)
  .use(store_1.default)
  .use(router_1.default)
  .mount('#app')
// # sourceMappingURL=main.js.map
