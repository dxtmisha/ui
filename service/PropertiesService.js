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

    console.log('this.treeProperties', this.treeProperties.md2.properties.image.properties)
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

  getLink (design, value) {
    const index = this.getLinkIndex(design, value.value)
    const property = this.getItem(design, index)

    return property ? this.initScssObject(property, design) : ''
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
      case 'section':
        if (index.match(/^=/ig)) {
          data = index.replace(/^=/ig, '')
        } else if (index.match(/^\^\^/ig)) {
          data = index.replace(/^\^\^/ig, `?-${property.__fullIndex?.[1]}--`)
        } else if (index.match(/^\^/ig)) {
          data = index.replace(/^\^/ig, '?--')
        }
        break
    }

    return data
  }

  getScss () {
    return `$designsProperties: (${this.initScss(this.initScssObject())});`
  }

  getScssValue (design, property) {
    return property.__value.toString()
      .replace(/\?[-.]/ig, `${design}-`)
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
    const type = property?.value && property?.type ? property.type : property.__name

    let data

    if (type.match(/^[^|]+\|.*?$/)) {
      data = type.split('|')[0]
    } else if (type.match(/^@/)) {
      data = 'link'
    } else if (type.match(/^#/)) {
      data = 'subclass'
    } else if (type.match(/^!/)) {
      data = 'animate'
    } else if (
      type.match(/^::/) ||
      cssSelectorsVirtual.indexOf(index) !== -1
    ) {
      data = 'virtual'
    } else if (
      type.match(/^:/) ||
      cssSelectors.indexOf(index.replace(/\([^)]*?\)/ig, '')) !== -1
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

  initMap (
    properties = this.properties,
    tree = this.treeProperties,
    parentIndex = [],
    parent = null,
    parentItem = null
  ) {
    forEach(properties, (property, name) => {
      if (this.isSection(name, property)) {
        const item = new PropertiesItemService(name, parentItem, property)

        const index = this.toIndex(name)
        const fullIndex = [...parentIndex, index]
        const names = fullIndex.join('.')

        property.__item = item
        property.__index = index
        property.__design = parentIndex?.[0]
        property.__parent = parentIndex?.[parentIndex.length - 1]
        property.__parentItem = parent
        property.__name = name
        property.__names = names
        property.__fullIndex = fullIndex
        property.__type = this.getType(property)
        property.__options = this.getOptions(property)

        this.addMapProperties(parentIndex, property)
        PropertiesMapService.setItem(item)

        if (item.getType() === 'link') {
          /**
           * @type {PropertiesItemService}
           */
          const linkProperties = PropertiesMapService.getItem(item.getValueToCode())

          if (linkProperties) {
            this.initMap(
              linkProperties.getProperty(),
              tree,
              parentIndex,
              parent,
              parentItem
            )
          }
          console.log('link', item.getValueToCode())
        } else {
          const key = item.getMark()

          console.log('name', name)

          tree[key] = {
            item,
            properties: {}
          }

          if ('value' in property) {
            // this.initValue(property, parent)
          } else {
            this.initMap(
              property,
              tree[key].properties,
              fullIndex,
              property,
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

  initScssObject (
    properties = this.properties,
    design = undefined
  ) {
    const data = {}

    forEach(properties, (property, name) => {
      if (this.isSection(name, property)) {
        const item = property.__item

        const index = property.__index.toString().replace('?', design)
        const type = item.getType()
        const designIndex = design || name
        let value

        if (type === 'link') {
          console.log('type', type, item.getCode())
          // replaceRecursive(data, this.getLink(designIndex, property, properties))
        } else if ('__value' in property) {
          value = {
            type,
            value: this.getScssValue(designIndex, property)
          }
        } else {
          value = {
            type,
            options: typeof property.__options === 'string'
              ? property.__options.replace('?', design)
              : property.__options,
            value: this.initScssObject(property, designIndex)
          }
        }

        if (value) {
          if (index in data) {
            replaceRecursive(data[index], value)
          } else {
            data[index] = value
          }
        }
      }
    })

    return data
  }

  initValue (property, parentItem) {
    if ('__value' in property) {
      return
    }

    const design = property.__design
    const parent = property.__parent
    let value

    if (property.value.toString().match(/^#[\dabcdef]{6,8}/ig)) {
      value = property.value
    } else {
      value = this.toValue(design, property)
    }

    if (
      parent &&
      property.__type !== 'property' &&
      parentItem.__type === 'property' &&
      cssProperties.indexOf(parent) !== -1
    ) {
      property.__type = 'section'
      property[parent] = {
        value: property.value,
        __value: value
      }

      // this.initMap(property, property.__fullIndex)
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
        ?.replace(/^[^.]+/i, '?')
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
