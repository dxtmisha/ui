'use strict'
const __importDefault = (this && this.__importDefault) || function (mod) {
  return (mod && mod.__esModule) ? mod : { default: mod }
}
Object.defineProperty(exports, '__esModule', { value: true })
const vue_router_1 = require('vue-router')
const HomeView_vue_1 = __importDefault(require('../views/HomeView.vue'))
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView_vue_1.default
  }
]
const router = (0, vue_router_1.createRouter)({
  history: (0, vue_router_1.createWebHistory)(process.env.BASE_URL),
  routes
})
exports.default = router
// # sourceMappingURL=index.js.map
