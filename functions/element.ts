import { executeFunction, forEach, isFilled } from './data'
import { ElementOptionsItemType, ElementOptionsType, ElementType, RefOrNormalType } from '../constructors/types'
import { isRef } from 'vue'

/**
 * In an HTML document
 *
 * В HTML-документах создаёт элемент c тем тегом, что указан в аргументе
 * @param parentElement the DOM node's parent Element / родитель для нового элемента
 * @param tagName A string that specifies the type of element to be created / строка,
 * указывающая элемент какого типа должен быть создан
 * @param options an object with attributes or a function for processing an element / объект
 * с атрибутами или функция для обработки элемента
 * @param referenceElement the node before which newNode is inserted / элемент, перед
 * которым будет вставлен newElement
 */
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
