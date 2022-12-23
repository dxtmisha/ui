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
        case 'property':
          if (!item.property.isValue()) {
            data[item.code] = item.property.getType()
          }
          break
        case 'subclass':
        case 'section':
          data[item.code] = item.property.getType()
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

    const code = property.getCode()
    const old = this.list.find(item => item.code === code)

    if (old) {
      old.property = property
    } else {
      this.list.push({
        code,
        property
      })
    }

    this.setDesign(property.getDesign())
  }

  static init () {
    if (!('list' in this)) {
      this.list = []
      this.designList = []
    }
  }
}
