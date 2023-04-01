'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.DefaultGlobalConfiguration = void 0
class DefaultGlobalConfiguration {
  static values = {}
  static getValue (code, name) {
    return this.values?.[code]?.[name]
  }

  static setValue (code, name, value) {
    if (!(code in this.values)) {
      this.values[code] = {}
    }
    this.values[code][name] = value
  }

  static setValues (values) {
    this.values = values
  }
}
exports.DefaultGlobalConfiguration = DefaultGlobalConfiguration
// # sourceMappingURL=DefaultGlobalConfiguration.js.map
