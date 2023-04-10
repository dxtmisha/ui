'use strict'
/* eslint-disable no-console */
Object.defineProperty(exports, '__esModule', { value: true })
const register_service_worker_1 = require('register-service-worker')
if (process.env.NODE_ENV === 'production') {
  (0, register_service_worker_1.register)(`${process.env.BASE_URL}service-worker.js`, {
    ready () {
      console.log('App is being served from cache by a service worker.\n' +
                'For more details, visit https://goo.gl/AFskqB')
    },
    registered () {
      console.log('Service worker has been registered.')
    },
    cached () {
      console.log('Content has been cached for offline use.')
    },
    updatefound () {
      console.log('New content is downloading.')
    },
    updated () {
      console.log('New content is available; please refresh.')
    },
    offline () {
      console.log('No internet connection found. App is running in offline mode.')
    },
    error (error) {
      console.error('Error during service worker registration:', error)
    }
  })
}
// # sourceMappingURL=registerServiceWorker.js.map
