'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.ComponentDesign = void 0
const ComponentItem_1 = require('./ComponentItem')
const DefaultConfiguration_1 = require('./DefaultConfiguration')
class ComponentDesign {
  static designDefaults = {}
  static designItems = {}
  static getDefault (code) {
    if (!(code in this.designDefaults)) {
      this.designDefaults[code] = new DefaultConfiguration_1.DefaultConfiguration(code)
    }
    return this.designDefaults[code]
  }

  static getItem (code, instruction) {
    if (!(code in this.designItems)) {
      this.designItems[code] = new ComponentItem_1.ComponentItem(code, instruction)
    }
    return this.designItems[code]
  }
}
exports.ComponentDesign = ComponentDesign
// # sourceMappingURL=ComponentDesign.js.map
