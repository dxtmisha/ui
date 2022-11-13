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
