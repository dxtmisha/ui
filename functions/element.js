'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.getIdElement = exports.frame = exports.createElement = void 0
const data_1 = require('./data')
function createElement (parentElement, tagName = 'div', options = undefined, referenceElement = null) {
  const element = document.createElement(tagName)
  if (typeof options === 'function') {
    options(element)
  } else if (typeof options === 'object') {
    (0, data_1.forEach)(options, (value, key) => {
      if ((0, data_1.isFilled)(value)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element[key] = (0, data_1.executeFunction)(value)
      }
    })
  }
  parentElement?.insertBefore(element, referenceElement)
  return element
}
exports.createElement = createElement
function frame (callback, next = () => false, end) {
  requestAnimationFrame(() => {
    callback()
    if (next()) {
      frame(callback, next, end)
    } else if (end) {
      end()
    }
  })
}
exports.frame = frame
let ids = 1
function getIdElement (element, selector) {
  if (element) {
    if (!element.id) {
      element.setAttribute('id', `id-${ids++}`)
    }
    return selector ? `#${element.id}${selector}`.trim() : element.id.toString()
  } else {
    return `${ids++}`
  }
}
exports.getIdElement = getIdElement
exports.default = {
  createElement,
  frame,
  getIdElement
}
// # sourceMappingURL=element.js.map
