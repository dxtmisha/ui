const { replaceRecursive } = require('../functions/data')

module.exports = class {
  static getItem (code) {
    this.init()

    const item = this.list.find(item => item.code === code)

    if (item) {
      return item.property
    } else {
      console.error(`[ERROR] PropertiesMapService.getItem(${code})`)
      return undefined
    }
  }

  static getItems (code) {
    this.init()

    const items = this.list.filter(item => item.code === code)

    if (items) {
      const property = {}

      items.forEach(item => replaceRecursive(property, item.property.getProperty()))

      return property
    } else {
      console.error(`[ERROR] PropertiesMapService.getItem(${code})`)
      return undefined
    }
  }

  static getItemsObject () {
    this.init()

    const data = {}

    this.list.forEach(item => {
      switch (item.property.getType()) {
        case 'default':
        case 'link-class':
          data[item.code] = {
            type: item.property.getType(),
            value: item.property.getValueToCode()
          }
          break
        case 'rename':
          data[item.code] = {
            type: item.property.getType(),
            value: item.property.getRenameValue()
          }

          break
        case 'property':
          if (!item.property.isValue()) {
            data[item.code] = item.property.getType()
          }
          break
        case 'subclass':
        case 'section':
          if (item.code.match(/^[\w-.]+$/ig)) {
            data[item.code] = item.property.getType()
          }

          break
      }
    })

    return data
  }

  static isDesign (design) {
    return this.designList.indexOf(design) !== -1
  }

  static setDesign (design) {
    if (!this.isDesign(design)) {
      this.designList.push(design)
    }
  }

  /**
   * @param {{}} property
   */
  static setItem (property) {
    this.init()
    this.list.push({
      code: property.getCode(),
      property
    })

    this.setDesign(property.getDesign())
  }

  static init () {
    if (!('list' in this)) {
      this.list = []
      this.designList = []
    }
  }
}
