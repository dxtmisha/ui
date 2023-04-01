'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ComponentAbstract = void 0
const vue_1 = require('vue')
const ComponentDesign_1 = require('./ComponentDesign')
const data_1 = require('../functions/data')
class ComponentAbstract {
  props
  context
  static code = 'none'
  static instruction = {}
  static emits
  static getComponentItem () {
    return ComponentDesign_1.ComponentDesign.getItem(this.code, this.instruction)
  }

  static getProps () {
    return this.getComponentItem().getProps()
  }

  element = (0, vue_1.ref)()
  refs
  classesProps = []
  classesExtra = []
  stylesProps = []
  constructor (props, context) {
    this.props = props
    this.context = context
    this.refs = (0, vue_1.toRefs)(props);
    (0, vue_1.onBeforeUpdate)(() => console.log(`onBeforeUpdate: ${this.getConstructor().code}`))
  }

  getConstructor () {
    return this.constructor
  }

  getItem () {
    return this.getConstructor().getComponentItem()
  }

  getName () {
    return this.getItem().getBasicClassName()
  }

  getSelector () {
    return `.${this.getName()}`
  }

  getStyleName () {
    return `--${this.getItem().getBasicClassName()}-`
  }

  classesMain = (0, vue_1.computed)(() => {
    const main = {
      [this.getItem().getBasicClassName()]: true
    };
    (0, data_1.forEach)(this.getItem().getProperties(), (item, name) => {
      if (this.isPropDesign(name)) {
        if (typeof this.props[name] === 'boolean' ||
                    this.classesExtra.indexOf(name) !== -1) {
          main[item.className] = true
        } else if (item?.values?.indexOf(this.props[name]) !== -1) {
          main[`${item.classValue}${this.props[name]}`] = true
        }
      }
    })
    return main
  })

  stylesMain = (0, vue_1.computed)(() => {
    const main = {};
    (0, data_1.forEach)(this.getItem().getProperties(), (item, name) => {
      if (this.isPropDesign(name, this.stylesProps) &&
                typeof this.props[name] !== 'boolean' &&
                item?.values?.indexOf(this.props[name]) === -1) {
        main[`--${item.classStyle}`] = this.props[name]
      }
    })
    return main
  })

  emitGo (name, values) {
    this.context.emit(name, values)
    return this
  }

  getBasic () {
    const item = this.getItem()
    return {
      element: this.element,
      name: item.getName(),
      design: item.getDesign(),
      className: item.getBasicClassName()
    }
  }

  getBind (value, nameExtra = {}, name = 'value') {
    return (0, vue_1.computed)(() => {
      const isName = typeof nameExtra === 'string'
      const extra = isName ? {} : nameExtra
      const data = ((0, vue_1.isRef)(extra) ? extra.value : extra) || {}
      const index = isName ? nameExtra : name
      if (value.value &&
                typeof value.value === 'object' &&
                index in value.value) {
        return {
          ...data,
          ...value.value
        }
      } else {
        return {
          ...data,
          [index]: value.value
        }
      }
    })
  }

  getClassName (name = [], status = []) {
    return this.getItem().getClassName(name, status)
  }

  getClasses (extra) {
    return (0, vue_1.computed)(() => {
      const classes = {
        main: this.classesMain.value,
        ...this.getItem().getSubClasses()
      }
      if (extra) {
        return (0, data_1.replaceRecursive)((0, data_1.replaceRecursive)({}, (0, vue_1.reactive)(extra)), classes)
      } else {
        return classes
      }
    })
  }

  getStyles (extra) {
    return (0, vue_1.computed)(() => {
      const styles = {
        main: this.stylesMain.value
      }
      if (extra) {
        return (0, data_1.replaceRecursive)((0, data_1.replaceRecursive)({}, (0, vue_1.reactive)(extra)), styles)
      } else {
        return styles
      }
    })
  }

  isPropDesign (name, props = this.classesProps) {
    return (this.props?.[name] && (props.length === 0 ||
            props.indexOf(name) !== -1))
  }
}
exports.ComponentAbstract = ComponentAbstract
// # sourceMappingURL=ComponentAbstract.js.map
