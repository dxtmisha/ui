const REG_SEARCH = /^([^|]+\||@|#|::|:|&)/
const REG_SUB = /(?<={[^}]*?){([^{}]+)}(?=[^{]*?})/ig

const PropertiesFileService = require('./PropertiesFileService')
const {
  forEach,
  toKebabCase
} = require('../functions')

const cssProperties = require('../constructors/cssProperties.json')
const cssSelectors = require('../constructors/cssSelectors.json')
const cssSelectorsVirtual = require('../constructors/cssSelectorsVirtual.json')

module.exports = class extends PropertiesFileService {
  constructor (designs) {
    super(designs)

    this.mapProperties = {}

    this.initMap()
    process.env.VUE_APP_VERSION = JSON.stringify(this.getMap())
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

    return `${(designIndex in this.properties || designIndex === '~' ? '' : `${design}.`)}${index}`
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
    } else if (!fullIndex.match(/~\./i)) {
      console.error(`[ERROR] PropertiesService.getItem(${design}, ${index}, ${fullIndex})`)
      return undefined
    }
  }

  getLink (design, value, propertiesParent) {
    const index = this.getLinkIndex(design, value.value)
    const property = this.getItem(design, index)

    return property ? this.initScss(property, design, propertiesParent) : ''
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

  getOptions (property) {
    const index = property.__index
    let data

    switch (property.__type) {
      case 'media':
        data = `'${
          index
            .replace(
              /{([^{}]+)}/ig,
              (all, key) => this.getValue(property.__design, key) || key
            )
            .trim()
        }'`
        break
      case 'var':
        if (index.match(/^=/ig)) {
          data = index.replace(/^=/ig, '')
        } else if (index.match(/^\^/ig)) {
          data = index.replace(/^\^/ig, `${property.__design}-`)
        }
        break
    }

    return data
  }

  getScss () {
    return `$designsProperties: (${this.initScss()});`
  }

  getScssValue (design, property) {
    return property.__value.toString().replace('~-', `${design}-`)
  }

  getValue (design, index) {
    return this.getItem(design, index)?.value || index
  }

  getType (property) {
    /**
     * @type {string}
     */
    const index = property.__index

    /**
     * @type {string}
     */
    const type = property?.type || property.__name

    let data

    if (type.match(/^[^|]+\|.*?$/)) {
      data = type.split('|')[0]
    } else if (type.match(/^&/)) {
      data = 'link'
    } else if (type.match(/^@/)) {
      data = 'media'
    } else if (type.match(/^#/)) {
      data = 'subclass'
    } else if (
      type.match(/^::/) ||
      cssSelectorsVirtual.indexOf(index) !== -1
    ) {
      data = 'virtual'
    } else if (
      type.match(/^:/) ||
      cssSelectors.indexOf(index) !== -1
    ) {
      data = 'selector'
    } else if (cssProperties.indexOf(index) !== -1) {
      data = 'property'
    } else if ('value' in property) {
      data = 'var'
    } else {
      data = 'section'
    }

    return data
  }

  initMap (properties = this.properties, parent = []) {
    forEach(properties, (property, name) => {
      if (this.isSection(name, property)) {
        const index = this.toIndex(name)
        const fullIndex = [...parent, index]
        const names = fullIndex.join('.')

        property.__index = index
        property.__design = parent?.[0]
        property.__parent = parent?.[parent.length - 1]
        property.__name = name
        property.__names = names
        property.__fullIndex = fullIndex
        property.__type = this.getType(property)
        property.__options = this.getOptions(property)

        this.mapProperties[names] = property

        if ('value' in property) {
          this.initValue(property)
        } else {
          this.initMap(property, fullIndex)
        }
      }
    })
  }

  initScss (
    properties = this.properties,
    design = undefined,
    propertiesParent = undefined
  ) {
    let data = ''

    forEach(properties, (property, name) => {
      if (this.isSection(name, property)) {
        const index = property.__index
        const type = property.__type
        const designIndex = design || name

        if (propertiesParent === undefined || !(name in propertiesParent)) {
          if (type === 'link') {
            data += this.getLink(designIndex, property, properties)
          } else if ('__value' in property) {
            data += `'${index}': (type:${type},value:${this.getScssValue(designIndex, property)}),`
          } else if (type !== 'section') {
            const options = property.__options
            data += `'${index}': (type:${type},${options ? `options:${options},` : ''}value:(${this.initScss(property, designIndex)})),`
          } else {
            data += `'${index}': (${this.initScss(property, designIndex)}),`
          }
        }
      }
    })

    return data
  }

  initValue (property) {
    if ('__value' in property) {
      return
    }

    const design = property.__design
    const parent = property.__parent
    let value

    if (property.value.match(/^#[\dabcdef]{6,8}/ig)) {
      value = property.value
    } else {
      value = this.toValue(design, property)
    }

    if (
      parent &&
      cssProperties.indexOf(parent) !== -1
    ) {
      property.__type = 'section'
      property[parent] = {
        value: property.value,
        __value: value
      }

      this.initMap(property, property.__fullIndex)
    } else {
      property.__value = value
    }
  }

  /**
   * @param {string} index
   * @param {Object<string,string>} property
   * @return {false}
   */
  isSection (index, property) {
    return !index.match(/^__/) && typeof property === 'object'
  }

  /**
   * @param {string} name
   * @return {*}
   */
  toIndex (name) {
    return name
      .replace(/^[\S\s]+\|([^|]+)$/, '$1')
      .replace(REG_SEARCH, '')
      .trim()
  }

  toValue (design, property) {
    const index = property.__index
    const value = property.value

    let data = this.toSub(design, value)

    data = data
      .replace(/(['"])/ig, '\\$1')
      .replace(
        /{([^{}]+)}/ig,
        (all, key) => `var(--${this.getIndex(design, toKebabCase(key))?.replace(/\./ig, '-')})`
      )

    if (index.match(/^_/i)) {
      const indexMain = this.getIndex(design, toKebabCase(property.__names))
        ?.replace(/^[^.]+/i, '~')
        ?.replace(/\./ig, '-')
        ?.replace(/-_/ig, '-')

      return `'var(--${indexMain}, ${data})'`
    } else {
      return `'${data}'`
    }
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
