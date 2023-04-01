'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DefaultConfiguration = void 0
const ComponentProperty_1 = require('./ComponentProperty')
const DefaultGlobalConfiguration_1 = require('./DefaultGlobalConfiguration')
const data_1 = require('../functions/data')
class DefaultConfiguration {
  code
  defaultValues = {}
  validatorValues = {}
  // eslint-disable-next-line no-useless-constructor
  constructor (code) {
    this.code = code
  }

  getDefaultValues (name) {
    if (!(name in this.defaultValues)) {
      const def = ComponentProperty_1.ComponentProperty.getByDefaultType(this.code, name)
      this.defaultValues[name] = def?.value === 'true' || def?.value
    }
    return this.defaultValues[name]
  }

  getValidatorValues (name) {
    if (!(name in this.validatorValues)) {
      this.validatorValues[name] = ComponentProperty_1.ComponentProperty.getValues(this.code, name)
    }
    return this.validatorValues[name]
  }

  defaultValue (name, defaultValue) {
    return () => {
      return (this.getDefaultValues(name) ||
                DefaultGlobalConfiguration_1.DefaultGlobalConfiguration.getValue(this.code, name) ||
                defaultValue)
    }
  }

  validator (name) {
    return (value) => this.getValidatorValues(name).indexOf(value) !== -1
  }

  validatorAndNumber (name) {
    return (value) => {
      if (typeof value === 'number') {
        return true
      } else {
        return this.getValidatorValues(name).indexOf(value) !== -1
      }
    }
  }

  static values = {}
  static init (design) {
    return (prop, defaultValue = undefined) => () => this._getValue(prop, design) || this._getValue(prop, 'global') || (0, data_1.executeFunction)(defaultValue)
  }

  static _getValue (prop, key) {
    return this.values?.[key]?.[prop]
  }

  static validator (values) {
    return (value) => values.indexOf(value) !== -1
  }

  static validatorOrNumber (values) {
    return (value) => {
      if (typeof value === 'number') {
        return value
      } else {
        return values.indexOf(value) !== -1
      }
    }
  }
}
exports.DefaultConfiguration = DefaultConfiguration
// # sourceMappingURL=DefaultConfiguration.js.map
