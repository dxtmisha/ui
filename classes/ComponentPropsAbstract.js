'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ComponentPropsAbstract = void 0
const vue_1 = require('vue')
const data_1 = require('../functions/data')
class ComponentPropsAbstract {
  props
  extra
  // eslint-disable-next-line no-useless-constructor
  constructor (props, extra = {}) {
    this.props = props
    this.extra = extra
  }

  data = (0, vue_1.computed)(() => {
    const data = {}
    Object.keys(this.list).forEach(name => {
      if (name !== this.name &&
                name in this.props &&
                !(0, data_1.isSelected)(name, this.exception)) {
        data[name] = this.props[name]
      }
    })
    return data
  })

  main = (0, vue_1.computed)(() => {
    return this.name in this.props ? this.props[this.name] : {}
  })

  extraBind = (0, vue_1.computed)(() => {
    const data = {};
    (0, data_1.forEach)(this.extra, (item, index) => {
      data[index] = (0, vue_1.isRef)(item) ? item.value : item
    })
    return data
  })

  out = (0, vue_1.computed)(() => {
    return {
      ...this.data.value,
      ...this.extraBind.value,
      ...this.main.value
    }
  })

  get () {
    return this.out
  }
}
exports.ComponentPropsAbstract = ComponentPropsAbstract
// # sourceMappingURL=ComponentPropsAbstract.js.map
