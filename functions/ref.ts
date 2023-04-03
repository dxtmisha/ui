import { isRef } from 'vue'
import { getElement } from './element'

import { ElementType, RefOrNormalType } from '../constructors/types'

/**
 * You return the values of the ref variable or the variable itself if it is not reactive
 *
 * Возвращаешь значения ref переменной или саму переменную, если она не реактивная
 * @param item reactive variable or ordinary value / реактивная переменная или обычное значение
 */
export function getRef<T = any> (item: RefOrNormalType<T>): T {
  return isRef(item) ? item.value : item
}

/**
 * Returns the first Element in the document that matches the specified selector or the element itself if it is an Element
 *
 * Возвращает первый Element документа, который соответствует указанному селектору или саму element, если надо явялеться Element
 * @param element selectors for matching or an Element / селекторов для сопоставления или Element
 */
export function getElementRef (
  element: RefOrNormalType<ElementType | string | undefined>
): ElementType | undefined | null {
  return getElement(getRef(element))
}
