import data from './functions/data'
import element from './functions/element'
import image from './functions/image'

export const {
  arrFill,
  executeFunction,
  forEach,
  getClipboardData,
  getColumn,
  getExp,
  isFilled,
  isSelected,
  isSelectedByList,
  maxListLength,
  minListLength,
  random,
  replaceRecursive,
  strFill,
  toCamelCase,
  toKebabCase,
  toReplaceTemplate
} = data

export const {
  createElement,
  frame,
  getElement,
  getIdElement
} = element

export const {
  createImage,
  getFileResult,
  getSRC,
  isImage
} = image
