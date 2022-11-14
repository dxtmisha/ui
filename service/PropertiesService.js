const REG_SEARCH = /^([^|]+\||@|#|::|:|!)/
const REG_SUB = /(?<={[^}]*?){([^{}]+)}(?=[^{]*?})/ig

const PropertiesFileService = require('./PropertiesFileService')
const PropertiesMapService = require('./PropertiesMapService')
const {
  forEach,
  replaceRecursive,
  toKebabCase
} = require('../functions')

const cssProperties = require('../constructors/cssProperties.json')
const cssSelectors = require('../constructors/cssSelectors.json')
const cssSelectorsVirtual = require('../constructors/cssSelectorsVirtual.json')
const PropertiesItemService = require('./PropertiesItemService')

module.exports = class extends PropertiesFileService {
  constructor (designs) {
    super(designs)

    this.treeProperties = {}
    this.mapProperties = {}

    this.initMap()
    process.env.VUE_APP_DESIGNS = JSON.stringify(this.getMap())
  }

  addMapProperties (parent, property) {
    const key = property.__type === 'subclass'
      ? [...parent, `#${property.__index}`].join('.')
      : property.__names

    this.mapProperties[key.replace(/[=^]/ig, '')] = property
    return this
  }

  /**
   * @param {string} index
   * @return {string}
   */
  getDesign (index) {
    return index.split('.', 2)?.[0]
  }

  getFullIndex (design, index) {
    const designIndex = this.getDesign(index)

    return `${(designIndex in this.properties || designIndex === '?' ? '' : `${design}.`)}${toKebabCase(index)}`
  }

  getIndex (design, index) {
    return this.getItem(design, index)?.__names || index
  }

  /**
   * @param {string} design
   * @param {string} index
   * @return {Object<string, string>}
   */
  getItem (design, index) {
    const fullIndex = this.getFullIndex(design, index)

    if (fullIndex in this.mapProperties) {
      return this.mapProperties[fullIndex]
    } else if (!fullIndex.match(/\?\./i)) {
      console.error(`[ERROR] PropertiesService.getItem(${design}, ${index}, ${fullIndex})`)
      return undefined
    }
  }

  getLinkIndex (design, value) {
    return this.toSub(design, value)
      ?.replace(/(^{|}$)/ig, '')
      ?.trim()
  }

  /**
   * @param {string} link
   * @param {string} to
   * @returns {string}
   */
  getMap (
    link = undefined,
    to = undefined
  ) {
    const data = {}

    forEach(this.mapProperties, (item, index) => {
      if (
        link === undefined ||
        index.match(new RegExp(`^${link.replace(/\./, '\\.')}\\.`, 'i'))
      ) {
        switch (item.__type) {
          case 'link':
            Object.assign(data, this.getMap(
              this.getLinkIndex(item.__design, item.value),
              item.__names.replace(new RegExp(`\\.${item.__index}$`, 'i'), '')
            ))
            break
          case 'media':
          case 'var':
            break
          default:
            data[to ? index.replace(link, to) : index] = item.__type
            break
        }
      }
    })

    return data
  }

  getScss () {
    console.log(
      'this.initScssObject()',
      this.initScssObject().d.value.ref.value['transition-duration'].value,
      this.initScss(this.initScssObject().d.value.ref.value['transition-duration'].value)
    )
    return '$designsProperties:();' // `$designsProperties: (${this.initScss(this.initScssObject())});`
  }

  getValue (design, index) {
    return this.getItem(design, index)?.value || index
  }

  initMap (
    properties = this.properties,
    tree = this.treeProperties,
    parentItem = null
  ) {
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
            this.initMap(
              property,
              tree[key].properties,
              item
            )
          }
        }
      }
    })
  }

  initScss (properties) {
    let data = ''

    forEach(properties, (property, index) => {
      if (property.type !== 'section') {
        data += `'${index}': (type:${property.type},`

        if ('options' in property) {
          data += property.options ? `options:${property.options},` : ''
          data += `value:(${this.initScss(property.value)})`
        } else {
          data += `value:${property.value}`
        }

        data += '),'
      } else {
        data += `'${index}': (${this.initScss(property.value)}${property.options ? `__options:${property.options},` : ''}),`
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

      if (
        type !== 'section' &&
        item.isValue()
      ) {
        data[index] = {
          type,
          value: item.getValueToCss()
        }
      } else {
        data[index] = {
          type,
          options: item.getOption(),
          value: this.initScssObject(dataProperties)
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
      console.log('initValue', property.getIndex())
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

  toSub (design, value) {
    if (typeof value === 'string') {
      let data = value
      let max = 10

      if (
        data.match(/[+\-*/]/ig) &&
        data.match(/[{}]/ig) &&
        data.match(/^calc/ig) === null
      ) {
        data = `calc(${data})`
      }

      while (
        max-- > 0 &&
        data.match(REG_SUB)) {
        data = data.replace(REG_SUB, (all, key) => this.getValue(design, toKebabCase(key)) || key)
      }

      return data
    } else {
      return value
    }
  }
}
