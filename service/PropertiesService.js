const PropertiesFileService = require('./PropertiesFileService')
const PropertiesItemService = require('./PropertiesItemService')
const PropertiesMapService = require('./PropertiesMapService')

const { forEach } = require('../functions')

module.exports = class extends PropertiesFileService {
  constructor (designs) {
    super(designs)

    this.treeProperties = {}

    this.initMap()
    process.env.VUE_APP_DESIGNS = JSON.stringify(this.getMap())
  }

  getMap () {
    return PropertiesMapService.getItemsObject()
  }

  getScss () {
    return `$designsProperties: (${this.initScss(this.initScssObject())});`
  }

  initMap (
    properties = this.properties,
    tree = this.treeProperties,
    parentItem = null
  ) {
    let isValue = false

    forEach(properties, (property, name) => {
      if (this.isSection(name, property)) {
        const item = new PropertiesItemService(name, parentItem, property)

        if (item.getType() === 'link') {
          /**
           * @type {PropertiesItemService}
           */
          const linkProperties = PropertiesMapService.getItem(item.getValueToCode())

          if (linkProperties) {
            this.initMap(
              linkProperties.getProperty(),
              tree,
              parentItem
            )
          }
        } else {
          const key = item.getMark()

          PropertiesMapService.setItem(item)

          if (key in tree) {
            tree[key].item = item
          } else {
            tree[key] = {
              item,
              properties: {}
            }
          }

          if (
            !item.isValue() ||
            this.initValue(item)
          ) {
            isValue = true
            this.initMap(
              property,
              tree[key].properties,
              item
            )
          }
        }
      }
    })

    if (
      parentItem &&
      parentItem.getType() === 'property' &&
      isValue
    ) {
      parentItem.setType('section')
    }
  }

  initScss (properties) {
    let data = ''

    forEach(properties, (property, index) => {
      if (property.type !== 'section') {
        data += `'${index}': (type:'${property.type}',`

        if ('options' in property) {
          data += property.options ? `options:'${property.options}',` : ''
        }

        if (typeof property.value === 'string') {
          data += `value:${property.value}`
        } else {
          data += `value:(${this.initScss(property.value)})`
        }

        data += '),'
      } else {
        data += `'${index}': (${this.initScss(property.value)}${property.options ? `__options:'${property.options}',` : ''}),`
      }
    })

    return data
  }

  initScssObject (properties = this.treeProperties) {
    const data = {}

    forEach(properties, property => {
      const item = property.item
      const dataProperties = property.properties

      const index = item.getIndex()
      const type = item.getType()

      if (type !== 'mixin') {
        if (
          type !== 'section' &&
          item.isValue()
        ) {
          const options = item.getOption()

          data[index] = {
            type,
            value: item.getValueToCss()
          }

          if (type === 'var' && options) {
            data[index].options = options
          }
        } else {
          data[index] = {
            type,
            options: item.getOption(),
            value: this.initScssObject(dataProperties)
          }
        }
      }
    })

    return data
  }

  initValue (property) {
    const isValue = property.isValue() &&
      property.parent?.getType() === 'property' &&
      property.getType() !== 'property'

    if (isValue) {
      property.setType('section')
      property.property[property.parent.getMark()] = {
        value: property.property.value
      }
    }

    return isValue
  }

  /**
   * @param {string} index
   * @param {Object<string,string>} property
   * @return {false}
   */
  isSection (index, property) {
    return !index.match(/^__/) && typeof property === 'object'
  }
}
