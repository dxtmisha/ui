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

export function frame (
  callback: () => void,
  next = (() => false) as () => boolean,
  end?: () => void
) {
  requestAnimationFrame(() => {
    callback()

    if (next()) {
      frame(callback, next, end)
    } else if (end) {
      end()
    }
  })
}

let ids = 1

export function getIdElement (element?: HTMLElement, selector?: string): string {
  if (element) {
    if (!element.id) {
      element.setAttribute('id', `id-${ids++}`)
    }

    return selector ? `#${element.id}${selector}`.trim() : element.id.toString()
  } else {
    return `${ids++}`
  }
}

export default {
  createElement,
  frame,
  getIdElement
}
