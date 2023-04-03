'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.frame = exports.createElement = exports.getIdElement = exports.getElement = void 0
const data_1 = require('./data')
/**
 * Returns the first Element in the document that matches the specified selector or the element
 *
 * Возвращает первый Element документа, который соответствует указанному селектору или саму element
 * @param element selectors for matching or an Element / селекторов для сопоставления или Element
 */
function getElement (element) {
  return typeof element === 'string' ? document.querySelector(element) : element
}
exports.getElement = getElement
/**
 * Counter generator of ID number of element
 *
 * Счетчик генератор номера ID элемента
 */
let ids = 1
/**
 * Returns the identifier (ID) of the element or creates it if the element has no ID
 *
 * Возвращает идентификатор (ID) элемента или создает его, если у элемента нет ID
 * @param element Element
 * @param selector selectors for matching / селекторов для сопоставления
 */
function getIdElement (element, selector) {
  if (element) {
    if (!element.id) {
      element.setAttribute('id', `id-${ids++}`)
    }
    return selector ? `#${element.id}${selector}`.trim() : element.id.toString()
  } else {
    return `${ids++}`
  }
}
exports.getIdElement = getIdElement
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
function createElement (parentElement, tagName = 'div', options = undefined, referenceElement = null) {
  const element = document.createElement(tagName)
  if (typeof options === 'function') {
    options(element)
  } else if (typeof options === 'object') {
    (0, data_1.forEach)(options, (value, key) => {
      if ((0, data_1.isFilled)(value)) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        element[key] = (0, data_1.executeFunction)(value)
      }
    })
  }
  parentElement?.insertBefore(element, referenceElement)
  return element
}
exports.createElement = createElement
/**
 * Cyclically calls requestAnimationFrame until next returns true
 * The window.requestAnimationFrame() method tells the browser that you wish to perform
 * an animation and requests that the browser calls a specified function to update an
 * animation right before the next repaint
 *
 * Циклически вызывает requestAnimationFrame, пока next возвращает true
 * window.requestAnimationFrame указывает браузеру на то, что вы хотите произвести
 * анимацию, и просит его запланировать перерисовку на следующем кадре анимации
 * @param callback the function to call when it's time to update your animation for
 * the next repaint / функция, которая будет вызвана, когда придёт время обновить
 * вашу анимацию на следующей перерисовке
 * @param next function that determines repetition / функция, которая определяет повторность
 * @param end function that is executed if the animation stops / функция, которая
 * выполняется, если останавливается анимация
 */
function frame (callback, next = () => false, end) {
  requestAnimationFrame(() => {
    callback()
    if (next()) {
      frame(callback, next, end)
    } else if (end) {
      end()
    }
  })
}
exports.frame = frame
// # sourceMappingURL=element.js.map
