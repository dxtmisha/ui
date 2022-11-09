import data from './functions/data'
import element from './functions/element'
import image from './functions/image'

export const {
  executeFunction,
  forEach,
  isFilled,
  replaceRecursive,
  toCamelCase,
  toKebabCase
} = data

export const {
  createElement
} = element

export const {
  createImage,
  getFileResult,
  getSRC,
  isImage
} = image
