const FILE_NAME = 'properties.json'
const requirePath = require('path')
const requireFs = require('fs')

const {
  forEach,
  isFilled,
  replaceRecursive,
  toKebabCase
} = require('../functions')

module.exports = class {
  constructor (designs) {
    this.properties = this.toStandard(
      this.requirePaths(['constructors', ...designs])
    )
  }

  getComponents (dir) {
    const dirs = this.getDirs(dir)
    const components = {}

    dirs.forEach(name => {
      if (!name.match(/\.\w+$/)) {
        replaceRecursive(components, this.getFile(dir, name, FILE_NAME))
      }
    })

    return components
  }

  getDirs (path) {
    return requireFs.existsSync(path) ? requireFs.readdirSync(path) : []
  }

  getFile (...paths) {
    const path = requirePath.join(...paths)
    return requireFs.existsSync(path) ? require(path) : {}
  }

  getMain (dir) {
    const dirs = this.getDirs(dir)

    if (dirs.indexOf(FILE_NAME) !== -1) {
      return this.getFile(dir, FILE_NAME)
    } else {
      return {}
    }
  }

  requirePaths (designs) {
    const properties = {}

    if (designs) {
      designs.forEach(design => {
        [
          requirePath.join(__dirname, '..', '..', '..', design),
          requirePath.join(__dirname, '..', design)
        ].forEach(dir => {
          const data = this.getMain(dir)

          if (isFilled(data)) {
            replaceRecursive(properties, data)
            replaceRecursive(properties, this.getComponents(dir))
            replaceRecursive(properties, data)
          }
        })
      })
    }

    return properties
  }

  toStandard (properties) {
    const data = {}

    forEach(properties, (value, key) => {
      const index = toKebabCase(key)

      if (typeof value !== 'object') {
        data[index] = { value }
      } else if ('value' in value) {
        data[index] = value
      } else if (isFilled(value)) {
        data[index] = this.toStandard(value)
      }
    })

    return data
  }
}
