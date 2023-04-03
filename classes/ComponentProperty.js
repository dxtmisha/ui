'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ComponentProperty = exports.CLASS_VAL = exports.CLASS_SUB = void 0
const To_1 = require('./To')
const data_1 = require('../functions/data')
exports.CLASS_SUB = '__'
exports.CLASS_VAL = '--'
class ComponentProperty {
  static designMain
  static codeToKebabCase (code, name) {
    return To_1.To.kebabCase(`${code}${name ? `.${name}` : ''}`)
  }

  static getByType (index, type) {
    const design = this.designMain?.[index]
    if (this.isType(design, type)) {
      return typeof design === 'string' ? { type: design } : design
    } else {
      return undefined
    }
  }

  static getByDefaultType (code, name) {
    const className = this.getByValueClassType(code, name)?.value ||
            this.codeToKebabCase(code, name)
    return this.getByType(this.codeToKebabCase(className, 'default'), 'default')
  }

  static getBySubClassType (code, name) {
    return this.getByType(this.codeToKebabCase(code, name), 'subclass')
  }

  static getByValueClassType (code, name) {
    return this.getByType(this.codeToKebabCase(code, name), 'link-class')
  }

  static getRename (code, name) {
    return this.getByType(this.codeToKebabCase(code, `${name}.rename`), 'rename')?.value
  }

  static getProperties (code, instruction) {
    return (0, data_1.forEach)(instruction, (instruction, name) => {
      return this.isProperty(code, name) ? name : undefined
    }, true)
  }

  static getSubClasses (code) {
    const data = []
    const exp = `${code}.`;
    (0, data_1.forEach)(this.designMain, (item, name) => {
      if (name.match(exp) &&
                this.getBySubClassType(name)) {
        data.push(name)
      }
    })
    return data
  }

  static getValues (code, name) {
    const className = this.getByValueClassType(code, name)?.value ||
            this.codeToKebabCase(code, name)
    const data = []
    const exp = `${this.codeToKebabCase(className)}.`;
    (0, data_1.forEach)(this.designMain, (item, name) => {
      if (name.match(exp)) {
        data.push(name.replace(exp, ''))
      }
    })
    return data
  }

  static isProperty (code, name) {
    return this.codeToKebabCase(code, name) in this.designMain
  }

  static isType (type, name) {
    return typeof type === 'string'
      ? name === type
      : name === type?.type
  }

  static toClass (index) {
    return To_1.To.kebabCase(index
      .replace(/\./, '-')
      .replace(/\./g, exports.CLASS_VAL))
  }

  static toProp (prop) {
    const data = {}
    if (Array.isArray(prop) || (!('type' in prop) &&
            !('required' in prop) &&
            !('default' in prop) &&
            !('validator' in prop))) {
      data.type = prop
    } else {
      [
        'type',
        'required',
        'default',
        'validator'
      ].forEach(key => {
        if (key in prop) {
          data[key] = prop[key]
        }
      })
    }
    return data
  }

  static {
    this.designMain = JSON.parse(process.env.VUE_APP_DESIGNS || '{}')
  }
}
exports.ComponentProperty = ComponentProperty
// # sourceMappingURL=ComponentProperty.js.map
