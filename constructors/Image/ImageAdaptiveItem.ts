import { computed, ComputedRef, ref, Ref } from 'vue'
import { ImageItemType } from '../types'

export const MAX_BEYOND = 256

export class ImageAdaptiveItem {
  readonly percentWidth: Ref<number>
  readonly percentHeight: Ref<number>
  readonly backgroundSize: Ref<string | undefined>

  private beyond = false as boolean
  private visible = false as boolean

  constructor (
    public element: Ref<HTMLElement | undefined>,
    public adaptive: Ref<boolean>,
    public data: Ref<ImageItemType>,
    public width: Ref<number>,
    public height: Ref<number>
  ) {
    this.percentWidth = ref(0)
    this.percentHeight = ref(0)
    this.backgroundSize = ref()
  }

  readonly factor = computed(() => {
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
  }) as ComputedRef<number>

  readonly size = computed(() => {
    const element = this.element.value
    const data = this.data.value

    if (
      element &&
      data
    ) {
      switch (this.type.value) {
        case 'x':
          return data.height * (element.offsetWidth * this.percentWidth.value / data.width)
        case 'y':
          return data.width * (element.offsetHeight * this.percentHeight.value / data.height)
      }
    }

    return 0
  }) as ComputedRef<number>

  readonly type = computed(() => {
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
  }) as ComputedRef<'x' | 'y' | undefined>

  isAdaptive (): boolean {
    return !!(
      this.adaptive.value && (
        this.width.value ||
        this.height.value
      )
    )
  }

  isBeyond (): boolean {
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

    return this.beyond
  }

  isVisible (): boolean {
    return this.visible
  }

  setBackgroundSize (factorMax: number): this {
    switch (this.type.value) {
      case 'x':
        this.backgroundSize.value = `${100 * this.percentWidth.value * factorMax}% auto`
        break
      case 'y':
        this.backgroundSize.value = `auto ${100 * this.percentHeight.value * factorMax}%`
        break
      default:
        this.backgroundSize.value = undefined
    }

    return this
  }

  setPercent (width: number, height: number): this {
    this.percentWidth.value = width
    this.percentHeight.value = height

    return this
  }
}
