import data from './functions/data'
import element from './functions/element'
import image from './functions/image'

export const {
  executeFunction,
  forEach,
  getExp,
  isFilled,
  replaceRecursive,
  toCamelCase,
  toKebabCase
} = data

export const {
  createElement,
  getIdElement
} = element

export const {
  createImage,
  getFileResult,
  getSRC,
  isImage
} = image
