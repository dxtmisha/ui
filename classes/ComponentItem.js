'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ComponentItem = void 0
const ComponentProperty_1 = require('./ComponentProperty')
const data_1 = require('../functions/data')
const To_1 = require('./To')
class ComponentItem {
  code
  instruction
  // eslint-disable-next-line no-useless-constructor
  constructor (code, instruction) {
    this.code = code
    this.instruction = instruction
  }

  basic
  design
  name
  props
  properties
  subClasses
  getBasicClassName () {
    if (!(this.basic)) {
      this.basic = this.code.replace('.', '-')
    }
    return this.basic
  }

  getClassName (name = [], status = []) {
    let value = this.getBasicClassName()
    if (name.length > 0) {
      value += `${ComponentProperty_1.CLASS_SUB}${name.join(ComponentProperty_1.CLASS_SUB)}`
    }
    if (status.length > 0) {
      value += `${ComponentProperty_1.CLASS_VAL}${status.join(ComponentProperty_1.CLASS_VAL)}`
    }
    return (0, data_1.toKebabCase)(value)
  }

  getDesign () {
    if (!(this.design)) {
      this.design = (0, data_1.toKebabCase)(this.code.split('.', 1)[0])
    }
    return this.design
  }

  getName () {
    if (!(this.name)) {
      this.name = (0, data_1.toKebabCase)(this.code
        ?.replace(/^([^.]+.)/ig, '')
        ?.replace('.', '-'))
    }
    return this.name
  }

  getProps () {
    if (!(this.props)) {
      const data = {};
      (0, data_1.forEach)(this.instruction, (instruction, name) => {
        const prop = ComponentProperty_1.ComponentProperty.toProp(instruction)
        const defaultValue = ComponentProperty_1.ComponentProperty.getByDefaultType(this.code, name)
        if (defaultValue) {
          prop.default = defaultValue?.value === 'true' ? true : defaultValue?.value
        }
        data[name] = prop
      })
      this.props = data
    }
    return this.props
  }

  getProperties () {
    if (!(this.properties)) {
      const data = {}
      ComponentProperty_1.ComponentProperty.getProperties(this.code, this.instruction)
        .forEach(name => {
          const link = ComponentProperty_1.ComponentProperty.getByValueClassType(this.code, name)
          const rename = ComponentProperty_1.ComponentProperty.getRename(this.code, name)
          const index = link?.value || `${this.code}.${name}`
          const className = ComponentProperty_1.ComponentProperty.toClass(index)
          const values = ComponentProperty_1.ComponentProperty.getValues(index)
          data[name] = {
            index,
            className,
            classStyle: rename || className.replace(ComponentProperty_1.CLASS_VAL, '-'),
            classValue: `${className}${ComponentProperty_1.CLASS_VAL}`,
            values
          }
        })
      this.properties = data
    }
    return this.properties
  }

  getSubClasses () {
    if (!(this.subClasses)) {
      const data = {}
      ComponentProperty_1.ComponentProperty.getSubClasses(this.code).forEach(name => {
        const index = name.replace(`${this.code}.`, '')
        const className = this.getClassName(index.split('.'))
        data[To_1.To.toCamelCase(index)] = {
          [className]: true
        }
      })
      this.subClasses = data
    }
    return this.subClasses
  }
}
exports.ComponentItem = ComponentItem
// # sourceMappingURL=ComponentItem.js.map
