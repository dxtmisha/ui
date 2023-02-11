import { WindowCoordinatesType } from './types'

export class WindowCoordinates {
  private readonly item = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0
  } as WindowCoordinatesType

  private updateCoordinates (): this {
    const rect = this.selectorControl()?.getBoundingClientRect()

    if (
      this.element.value &&
      rect && (
        this.coordinates.top !== rect.top ||
        this.coordinates.right !== rect.right ||
        this.coordinates.bottom !== rect.bottom ||
        this.coordinates.left !== rect.left ||
        this.coordinates.width !== this.element.value.offsetWidth ||
        this.coordinates.height !== this.element.value.offsetHeight
      )
    ) {
      this.coordinates.top = rect.top
      this.coordinates.right = rect.right
      this.coordinates.bottom = rect.bottom
      this.coordinates.left = rect.left
      this.coordinates.width = this.element.value.offsetWidth
      this.coordinates.height = this.element.value.offsetHeight

      this.updateX()
        .updateY()
    }

    return this
  }

  private restart (): this {
    this.item.top = 0
    this.item.right = 0
    this.item.bottom = 0
    this.item.left = 0
    this.item.width = 0
    this.item.height = 0

    return this
  }
}
