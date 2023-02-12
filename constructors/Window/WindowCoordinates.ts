import { Ref } from 'vue'
import { WindowElements } from './WindowElements'
import { WindowCoordinatesType } from './types'

export class WindowCoordinates {
  private readonly item = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
    innerWidth: 0,
    innerHeight: 0
  } as WindowCoordinatesType

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly elements: WindowElements
  ) {
  }

  get (): WindowCoordinatesType {
    return this.item
  }

  getTop (): number {
    return this.item.top
  }

  getRight (): number {
    return this.item.right
  }

  getBottom (): number {
    return this.item.bottom
  }

  getLeft (): number {
    return this.item.left
  }

  getWidth (): number {
    return this.item.width
  }

  getHeight (): number {
    return this.item.height
  }

  update (): boolean {
    const rect = this.elements.getRect()

    if (
      this.element.value &&
      rect && (
        this.item.top !== rect.top ||
        this.item.right !== rect.right ||
        this.item.bottom !== rect.bottom ||
        this.item.left !== rect.left ||
        this.item.width !== this.element.value.offsetWidth ||
        this.item.height !== this.element.value.offsetHeight ||
        this.item.innerWidth !== window.innerWidth ||
        this.item.innerHeight !== window.innerHeight
      )
    ) {
      this.item.top = rect.top
      this.item.right = rect.right
      this.item.bottom = rect.bottom
      this.item.left = rect.left
      this.item.width = this.element.value.offsetWidth
      this.item.height = this.element.value.offsetHeight
      this.item.innerWidth = window.innerWidth
      this.item.innerHeight = window.innerHeight

      return true
    }

    return false
  }

  restart (): this {
    this.item.top = 0
    this.item.right = 0
    this.item.bottom = 0
    this.item.left = 0
    this.item.width = 0
    this.item.height = 0

    return this
  }
}
