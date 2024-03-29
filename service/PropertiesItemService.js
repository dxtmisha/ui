const { To } = require('../classes/To')

const PropertiesMapService = require('./PropertiesMapService')

const cssProperties = require('../constructors/cssProperties.json')
const cssSelectors = require('../constructors/cssSelectors.json')
const cssSelectorsVirtual = require('../constructors/cssSelectorsVirtual.json')

const REG_MARK = /^(&|=|\?|\?\?)/ig
const REG_SEARCH = /^([^|]+\||@@|@|#|::|:|~)/ig
const REG_SUB = /(?<={[^}]*?){([^{}]+)}(?=[^{]*?})/ig
const REG_VAR = /{([^{}]+)}/ig

class PropertiesItemService {
  constructor (
    selector,
    parent = undefined,
    property = undefined
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
    return this.parent ? this.parent.getDesign() : this.getIndex()
  }

  /**
   * @returns {string}
   */
  getIndex () {
    if (!('index' in this)) {
      this.index = this.getIndexByName(this.getSelector())
    }

    return this.index
  }

  getIndexByName (selector) {
    return To.kebabCase(
      selector
        .replace(REG_SEARCH, '')
        .replace(REG_MARK, '')
        .trim()
    )
  }

  getIndexList () {
    return [
      ...(this.parent ? this.parent.getIndexList() : []),
      this.getIndex()
    ]
  }

  getKey () {
    return `${this.getType()}|${this.getMark()}`
  }

  /**
   * @returns {string}
   */
  getMark () {
    if (!('mark' in this)) {
      this.mark = this.getMarkBySelector(this.getSelector())
    }

    return this.mark
  }

  getMarkBySelector (selector) {
    return To.kebabCase(
      selector
        .replace(REG_SEARCH, '')
        .trim()
    )
  }

  getName () {
    return this.parent?.parent ? this.parent.getName() : this.getIndex()
  }

  getRename () {
    return this.property?.rename?.value?.replace(/\./ig, '-')
  }

  getRenameValue () {
    const item = new PropertiesItemService(this.getValue())
    return this.toFullName(item.getMark()).replace('.', '-')
  }

  getOriginal () {
    return this.property?.value
  }

  getOption () {
    if (!('option' in this)) {
      const mark = this.getMark()
      const type = this.getType()

      switch (type) {
        case 'media':
        case 'media-max':
        case 'media-min-max':
          this.option = `${this.toValueByMain(mark)}`
          break
        case 'section':
        case 'var':
          if (mark.match(/^=/ig)) {
            this.option = (type === 'section' && !mark.match(/^&/ig) ? '&.' : '') + mark.replace(/^=/ig, '')
          } else if (mark.match(/([&?])/ig)) {
            if (mark.match(/\?/ig)) {
              this.option = (type === 'section' && !mark.match(/^&/ig) ? '&.' : '') + this.toFullName(mark)
            } else {
              this.option = mark
            }
          }
          break
      }
    }

    return this.option
  }

  getProperty () {
    return this.property
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

      if (selector === '--') {
        this.type = 'none'
      } else if (selector === 'default') {
        this.type = 'default'
      } else if (selector === 'rename') {
        this.type = 'rename'
      } else if (selector.match(/^[^|]+\|.*?$/)) {
        this.type = selector.split('|')[0]
      } else if (selector.match(/^@@/)) {
        this.type = 'link-class'
      } else if (selector.match(/^@/)) {
        this.type = 'link'
      } else if (selector.match(/^#/)) {
        this.type = 'subclass'
      } else if (selector.match(/^~/)) {
        this.type = 'section'
      } else if (this.parent?.getType() === 'var') {
        this.type = 'var'
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
      } else if (this.isValue()) {
        this.type = 'var'
      } else {
        this.type = 'section'
      }
    }

    return this.type
  }

  /**
   * @returns {string}
   */
  getValue () {
    if (!('value' in this)) {
      const value = this.property?.value

      if (typeof value === 'string') {
        this.value = this.toValueBySub(value)
      } else {
        this.value = value?.toString() || ''
      }
    }

    return this.value
  }

  getValueToCode () {
    if (!('valueCode' in this)) {
      this.valueCode = this.toValueByCode(this.getValue())
        .replace(/(^{|}$)/ig, '')
    }

    return this.valueCode
  }

  getValueToCss () {
    if (!('valueCss' in this)) {
      const value = this.toFullName(
        this.getValueToVar()
      )

      if (this.getMark().match(/^_/i)) {
        const index = this.toValueByVar(this.getCode())
          .replace(/_/ig, '')
        const important = value.match('!important')

        this.valueCss = `'var(--${index}, ${value.replace('!important', '')})${important ? ' !important' : ''}'`
      } else if (value.match(/^#[\dabcdef]{6,8}/ig)) {
        this.valueCss = value
      } else {
        this.valueCss = `'${value}'`
      }
    }

    return this.valueCss
  }

  getValueToVar () {
    if (!('valueVar' in this)) {
      this.valueVar = this.toValueByCalc(this.getValue())
        .replace(/(['"])/ig, '\\$1')
        .replace(REG_VAR, (all, key) => `var(--${this.toValueByVar(key)})`)
    }

    return this.valueVar
  }

  isValue () {
    return 'value' in this.property
  }

  setType (value) {
    this.type = value

    return this
  }

  toFullName (value, separator = '-') {
    return value
      .replace(/\?\?__/ig, `${this.getDesign()}${separator}${this.getName()}__`)
      .replace(/\?\?[-.]?/ig, `${this.getDesign()}${separator}${this.getName()}${separator}`)
      .replace(/\?[-.]?/ig, `${this.getDesign()}${separator}`)
  }

  /**
   * @param {string} value
   * @returns {string}
   */
  toValue (value) {
    const code = To.kebabCase(this.toFullName(value, '.'))
    const design = this.toDesign(code)

    return `${PropertiesMapService.isDesign(design) ? '' : `${this.getDesign()}.`}${code}`
  }

  toValueByCalc (value) {
    if (typeof value === 'string') {
      if (value.match(/^=/)) {
        return value.replace(/^=/, '')
      } else if (
        value.match(/[+\-*/]/ig) &&
        value.match(/[{}]/ig) &&
        value.match(/calc/ig) === null
      ) {
        return `calc(${value})`
      } else {
        return value
      }
    } else {
      return ''
    }
  }

  toValueByCode (value) {
    return value.replace(REG_VAR, (all, key) => `{${this.toValue(key)}}`)
  }

  toValueByMain (value) {
    return this.toValueBySub(value)
      .replace(/{([^{}]+)}/ig, (all, key) => {
        return PropertiesMapService.getItem(this.toValue(key)).getOriginal() || key
      })
      .trim()
  }

  toValueBySub (value) {
    let max = 10

    while (
      max-- > 0 &&
      value.match(REG_SUB)) {
      value = value.replace(REG_SUB, (all, key) => {
        return PropertiesMapService.getItem(this.toValue(key)).getOriginal() || key
      })
    }

    return value.trim()
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

module.exports = PropertiesItemService
