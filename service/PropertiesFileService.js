const requirePath = require('path')
const requireFs = require('fs')

module.exports = class {
  constructor (designs) {
    const standard = this.toStandard(this.requirePaths(['constructors', ...designs]))

    this._properties = standard
    this._search = /^([^|]+\||@|#|::|:|&)/
    this._indexLink = {}
    this._index = this.toIndex(standard)
  }
}
