'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.Translation = void 0
const vue_1 = require('vue')
const functions_1 = require('../functions')
class Translation {
  static url = process.env.VUE_APP_TRANSLATION || 'translation'
  static translations = (0, vue_1.ref)({})
  static requestList = []
  static add (translations) {
    let data
    if (typeof translations === 'string') {
      try {
        data = JSON.parse(translations)
      } catch (e) {
      }
    } else {
      data = translations
    }
    if (typeof data === 'object') {
      this.translations.value = {
        ...this.translations.value,
        ...data
      }
    }
  }

  static get (indexList, replaces) {
    return (0, vue_1.computed)(() => {
      if (Array.isArray(indexList)) {
        const data = {}
        indexList.forEach(index => {
          data[index] = this.get(index).value
        })
        return data
      } else if (replaces && indexList in this.translations.value) {
        return (0, functions_1.toReplaceTemplate)(this.translations.value[indexList], replaces.value)
      } else {
        return this.translations.value?.[indexList] || indexList
      }
    })
  }

  static request (list) {
    if (Array.isArray(list)) {
      this.requestList.push(...list)
    }
  }

  static initRequest () {
    if (this.requestList.length > 0) {
      // Close
    }
  }
}
exports.Translation = Translation
// # sourceMappingURL=Translation.js.map
