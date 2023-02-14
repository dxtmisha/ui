import { computed, Ref, ref } from 'vue'
import { WindowClient } from './WindowClient'
import { WindowCoordinates } from './WindowCoordinates'

export class WindowPosition {
  private readonly x = ref<number>(0)
  private readonly y = ref<number>(0)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly coordinates: WindowCoordinates,
    private readonly client: WindowClient,
    private readonly className: string,
    private readonly axis: Ref<string>,
    private readonly indent: Ref<number>,
    private readonly contextmenu: Ref<boolean>
  ) {
  }

  readonly styleX = computed<string | null>(() => this.x.value > 0 ? `${this.x.value}px` : null)
  readonly styleY = computed<string | null>(() => this.y.value > 0 ? `${this.y.value}px` : null)

  getX (): number {
    return this.x.value
  }

  getY (): number {
    return this.y.value
  }

  getStyle (): object {
    return {
      [`${this.className}inset-x`]: this.styleX,
      [`${this.className}inset-y`]: this.styleY
    }
  }

  update (): this {
    if (this.coordinates.update()) {
      this.setX()
      this.setY()
    }

    return this
  }

  private setX (): this {
    if (this.element.value) {
      const indent = this.getIndent('x')
      const rectRight = this.contextmenu.value ? this.client.getX() : this.coordinates.getRight() + indent
      const rectLeft = this.contextmenu.value ? this.client.getX() : this.coordinates.getLeft() - indent
      const argumentValues = [] as number[]

      if (this.axis.value === 'x') {
        argumentValues.push(rectRight, rectLeft)
      } else {
        argumentValues.push(rectLeft, rectRight)
      }

      this.x.value = this.getInnerPosition(
        argumentValues[0],
        argumentValues[1],
        this.element.value.offsetWidth,
        window.innerWidth
      )
    }

    return this
  }

  private setY (): this {
    if (this.element.value) {
      const indent = this.getIndent('y')
      const rectTop = this.contextmenu.value ? this.client.getY() : this.coordinates.getTop() - indent
      const rectBottom = this.contextmenu.value ? this.client.getY() : this.coordinates.getBottom() + indent
      const argumentValues = [] as number[]

      if (this.axis.value === 'y') {
        argumentValues.push(rectBottom, rectTop)
      } else {
        argumentValues.push(rectTop, rectBottom)
      }

      this.y.value = this.getInnerPosition(
        argumentValues[0],
        argumentValues[1],
        this.element.value.offsetHeight,
        window.innerHeight
      )
    }

    return this
  }

  private getIndent (type: string): number {
    return this.axis.value === type ? this.indent.value : 0
  }

  private getInnerPosition (
    inValue: number,
    outValue: number,
    length: number,
    innerLength: number
  ): number {
    if (inValue + length <= innerLength) {
      return inValue
    } else if (outValue - length > 0) {
      return outValue - length
    } else {
      return 0
    }
  }
}
