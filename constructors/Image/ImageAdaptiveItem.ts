import { computed, ref, Ref } from 'vue'
import { ImageItemType } from '../types'

export const MAX_BEYOND = 256

export class ImageAdaptiveItem {
  readonly percentWidth = ref<number>(0)
  readonly percentHeight = ref<number>(0)

  private beyond = false as boolean
  private visible = false as boolean

  // eslint-disable-next-line no-useless-constructor
  constructor (
    public readonly element: Ref<HTMLElement | undefined>,
    public readonly adaptive: Ref<boolean>,
    public readonly data: Ref<ImageItemType>,
    public readonly width: Ref<number>,
    public readonly height: Ref<number>,
    public readonly factorMax: Ref<number>
  ) {
  }

  readonly type = computed<'x' | 'y' | undefined>(() => {
    if (
      this.width.value &&
      this.percentWidth.value > 0
    ) {
      return 'x'
    } else if (
      this.height.value &&
      this.percentHeight.value > 0
    ) {
      return 'y'
    } else {
      return undefined
    }
  })

  readonly factor = computed<number>(() => {
    const element = this.element.value
    const size = this.size.value

    if (element) {
      if (
        this.type.value === 'x' &&
        size > element.offsetHeight
      ) {
        return element.offsetHeight / size
      } else if (
        this.type.value === 'y' &&
        size > element.offsetWidth
      ) {
        return element.offsetWidth / size
      }
    }

    return 1
  })

  readonly size = computed<number>(() => {
    const element = this.element.value
    const data = this.data.value

    if (element && data) {
      switch (this.type.value) {
        case 'x':
          return data.height * (element.offsetWidth * this.percentWidth.value / data.width)
        case 'y':
          return data.width * (element.offsetHeight * this.percentHeight.value / data.height)
      }
    }

    return 0
  })

  readonly backgroundSize = computed<string | undefined>(() => {
    switch (this.type.value) {
      case 'x':
        return `${100 * this.percentWidth.value * this.factorMax.value}% auto`
      case 'y':
        return `auto ${100 * this.percentHeight.value * this.factorMax.value}%`
    }

    return undefined
  })

  isAdaptive (): boolean {
    return !!(
      this.adaptive.value && (
        this.width.value ||
        this.height.value
      )
    )
  }

  isBeyond (): boolean {
    return this.beyond
  }

  isVisible (): boolean {
    return this.visible
  }

  setPercent (width: number, height: number): this {
    this.percentWidth.value = width
    this.percentHeight.value = height

    return this
  }

  updateStatus (): this {
    this.beyond = false
    this.visible = false

    if (
      this.isAdaptive() &&
      this.element.value
    ) {
      const rect = this.element.value?.getBoundingClientRect()

      if (rect) {
        this.beyond = !(
          rect.bottom < (0 - MAX_BEYOND) ||
          rect.top > (window.innerHeight + MAX_BEYOND)
        )

        this.visible = !(
          rect.bottom < 0 ||
          rect.top > window.innerHeight
        )
      }
    }

    return this
  }
}
