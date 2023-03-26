import { executeFunction, forEach, isFilled } from './data'
import { ElementOptionsItemType, ElementOptionsType, ElementType, RefOrNormalType } from '../constructors/types'
import { isRef } from 'vue'

export function createElement<T = HTMLElement> (
  parentElement?: HTMLElement | undefined,
  tagName = 'div' as string,
  options = undefined as ElementOptionsType,
  referenceElement = null as HTMLElement | null
): T {
  const element = document.createElement(tagName)

  if (typeof options === 'function') {
    options(element)
  } else if (typeof options === 'object') {
    forEach<ElementOptionsItemType, string, void>(options, (value, key) => {
      if (isFilled(value)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element[key] = executeFunction<string>(value)
      }
    })
  }

  parentElement?.insertBefore(element, referenceElement)

  return element as T
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

export function getElement (
  element: RefOrNormalType<ElementType | string | undefined>
): ElementType | undefined | null {
  const item = isRef(element) ? element.value : element

  return typeof item === 'string' ? document.querySelector(item) : item
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
  getElement,
  getIdElement
}
