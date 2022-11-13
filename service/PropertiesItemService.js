const { toKebabCase } = require('../functions')

const PropertiesMapService = require('./PropertiesMapService')

const cssProperties = require('../constructors/cssProperties.json')
const cssSelectors = require('../constructors/cssSelectors.json')
const cssSelectorsVirtual = require('../constructors/cssSelectorsVirtual.json')

const REG_MARK = /^(&|\?|\?\?)/ig
const REG_SEARCH = /^([^|]+\||@|#|:|::)/ig
const REG_SUB = /(?<={[^}]*?){([^{}]+)}(?=[^{]*?})/ig

module.exports = class {
  constructor (
    selector,
    parent,
    property
  ) {
    this.selector = selector
    this.parent = parent
    this.property = property
  }

  /**
   * @returns {string}
   */
  getCode () {
    return this.getIndexList().join('.')
  }

  getDesign () {
    return this.parent ? this.parent.__item.getDesign() : this.getIndex()
  }

  /**
   * @returns {string}
   */
  getIndex () {
    if (!('index' in this)) {
      this.index = toKebabCase(
        this.getSelector()
          .replace(REG_SEARCH, '')
          .replace(REG_MARK, '')
          .trim()
      )
    }

    return this.index
  }

  getIndexList () {
    return [
      ...(this.parent ? this.parent.__item.getIndexList() : []),
      this.getIndex()
    ]
  }

  /**
   * @returns {string}
   */
  getMark () {
    if (!('mark' in this)) {
      this.mark = toKebabCase(
        this.getSelector()
          .replace(REG_SEARCH, '')
          .trim()
      )
    }

    return this.mark
  }

  getName () {
    return this.parent?.__item.parent ? this.parent.__item.getName() : this.getIndex()
  }

  getOriginal () {
    return this.property?.value
  }

  getOption (property) {
    if (!('option' in this)) {
      const mark = this.getMark()
      let data

      switch (this.getType()) {
        case 'media':
          data = `'${
            mark
              .replace(
                /{([^{}]+)}/ig,
                (all, key) => this.getValue(property.__design, key) || key
              )
              .trim()
          }'`
          break
        case 'var':
          if (mark.match(/^=/ig)) {
            data = mark.replace(/^=/ig, '')
          } else if (mark.match(/^\^/ig)) {
            data = mark.replace(/^\^/ig, `${property.__design}-`)
          }
          break
        case 'section':
          if (mark.match(/^=/ig)) {
            data = mark.replace(/^=/ig, '')
          } else if (mark.match(/^\^\^/ig)) {
            data = mark.replace(/^\^\^/ig, `?-${property.__fullIndex?.[1]}--`)
          } else if (mark.match(/^\^/ig)) {
            data = mark.replace(/^\^/ig, '?--')
          }
          break
      }
    }

    return this.option
  }

  getSelector () {
    return this.property?.value && this.property?.type
      ? this.property.type
      : this.selector
  }

  getType () {
    if (!('type' in this)) {
      const index = this.getIndex()
      const selector = this.getSelector()

      if (selector.match(/^[^|]+\|.*?$/)) {
        this.type = selector.split('|')[0]
      } else if (selector.match(/^@/)) {
        this.type = 'link'
      } else if (selector.match(/^#/)) {
        this.type = 'subclass'
      } else if (
        selector.match(/^::/) ||
        cssSelectorsVirtual.indexOf(index) !== -1
      ) {
        this.type = 'virtual'
      } else if (
        selector.match(/^:/) ||
        cssSelectors.indexOf(index.replace(/\([^)]*?\)/ig, '')) !== -1
      ) {
        this.type = 'selector'
      } else if (cssProperties.indexOf(index) !== -1) {
        this.type = 'property'
      } else if ('value' in this.property) {
        this.type = 'var'
      } else {
        this.type = 'section'
      }
    }

    return this.type
  }

  getValue () {
    if (!('value' in this)) {
      if (typeof this.property.value === 'string') {
        let value = this.property.value
        let max = 10

        while (
          max-- > 0 &&
          value.match(REG_SUB)) {
          value = value.replace(REG_SUB, (all, key) => {
            return PropertiesMapService.getItem(this.toValue(key)).getOriginal() || key
          })
        }

        this.value = value
      } else {
        this.value = this.property.value?.toString() || ''
      }
    }

    return this.value
  }

  getValueToCss () {
    if (!('valueCss' in this)) {
      const value = this.getValueToVar()

      if (this.getMark().match(/^_/i)) {
        const index = this.toValueByVar(this.getCode())
          .replace(/_/ig, '')

        this.valueCss = `'var(--${index}, ${value})'`
      } else {
        this.valueCss = `'${value}'`
      }
    }

    return this.valueCss
  }

  getValueToVar () {
    return this.toValueByCalc(this.getValue())
      .replace(/(['"])/ig, '\\$1')
      .replace(/{([^{}]+)}/ig, (all, key) => `var(--${this.toValueByVar(key)})`)
  }

  /**
   * @param {string} value
   * @returns {string}
   */
  toValue (value) {
    const code = toKebabCase(
      value
        .replace(/\?\?[-.]?/ig, `${this.getDesign()}.${this.getName()}.`)
        .replace(/\?[-.]?/ig, `${this.getDesign()}.`)
    )
    const design = this.toDesign(code)

    return `${PropertiesMapService.isDesign(design) ? '' : `${this.getDesign()}.`}${code}`
  }

  toValueByCalc (value) {
    if (typeof value === 'string') {
      if (
        value.match(/[+\-*/]/ig) &&
        value.match(/[{}]/ig) &&
        value.match(/^calc/ig) === null
      ) {
        return `calc(${value})`
      } else {
        return value
      }
    } else {
      return ''
    }
  }

  /**
   * @param {string} value
   * @returns {string}
   */
  toValueByVar (value) {
    return this.toValue(value).replace(/\./ig, '-')
  }

  /**
   * @param {string} value
   * @returns {*}
   */
  toDesign (value) {
    return value.split('.', 2)[0]
  }
}
