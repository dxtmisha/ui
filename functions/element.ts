import { executeFunction, forEach } from './data'
import { ElementOptionsItemType, ElementOptionsType } from '../constructors/types'

export function createElement (
  parentElement: HTMLElement,
  tagName = 'div' as string,
  options = undefined as ElementOptionsType,
  referenceElement = null as HTMLElement | null
) {
  const element = document.createElement(tagName)

  if (typeof options === 'function') {
    options(element)
  } else if (typeof options === 'object') {
    forEach<ElementOptionsItemType, string, void>(options, (value, key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      element[key] = executeFunction<string>(value)
    })
  }

  parentElement.insertBefore(element, referenceElement)
  return element
}

export default {
  createElement
}
