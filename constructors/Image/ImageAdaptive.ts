import { ref, Ref, watch } from 'vue'
import { EventItem } from '../../classes/EventItem'
import { ImageAdaptiveItem } from './ImageAdaptiveItem'
import { ImageItemSizeType, ImageItemType } from '../types'

export const MAX_TIMEOUT = 128

export class ImageAdaptive {
  private static objects = [] as ImageAdaptiveItem[]
  private static objectsAdaptive = [] as ImageAdaptiveItem[]
  private static event?: EventItem
  private static time?: number
  private static oldVisible?: string

  private static offset: ImageItemSizeType
  private static size: ImageItemSizeType

  private static factorMax = ref<number>(1)

  static add (
    element: Ref<HTMLElement | undefined>,
    adaptive: Ref<boolean>,
    data: Ref<ImageItemType>,
    width: Ref<number>,
    height: Ref<number>
  ): ImageAdaptiveItem {
    const object = new ImageAdaptiveItem(
      element,
      adaptive,
      data,
      width,
      height,
      this.factorMax
    )

    this.objects.push(object)
    this.init()

    watch([
      element,
      adaptive,
      data,
      width,
      height
    ], () => () => this.init())

    return object
  }

  static remove (object: ImageAdaptiveItem): void {
    const key = this.objects.findIndex(item => item === object)

    if (key !== -1) {
      this.objects.splice(key, 1)
    }

    this.init()
  }

  static init (): void {
    if (
      this.event &&
      this.objects.length < 1
    ) {
      this.event.stop()
      this.event = undefined
    } else {
      this.event = new EventItem(window, () => this.preparation())
        .setType(['scroll'])
        .go()

      this.preparation(32)
    }
  }

  private static preparation (timeout = MAX_TIMEOUT as number): void {
    if (!this.time) {
      this.time = setTimeout(() => {
        this.time = undefined
        this.start()
      }, timeout)
    }
  }

  private static start (): void {
    if (this.objects.find(item => item.isAdaptive())) {
      this.updateVisible()
    } else {
      this.event?.stop()
    }
  }

  private static updateVisible (): void {
    let indexSum = ''

    this.objectsAdaptive = []
    this.objects.forEach((item, index) => {
      item.updateStatus()

      if (item.isBeyond()) {
        this.objectsAdaptive.push(item)

        if (item.isVisible()) {
          indexSum += `[${index.toString()}]`
        }
      }
    })

    if (this.oldVisible !== indexSum) {
      this.oldVisible = indexSum
      this.updateSize()
      this.updatePercent()
    }
  }

  private static updateSize (): void {
    this.resetSize()
    this.objectsAdaptive.forEach(item => {
      if (
        item.element.value &&
        item.isVisible()
      ) {
        const element = item.element.value

        if (element.offsetWidth < this.offset.width) {
          this.offset.width = element.offsetWidth
        }

        if (element.offsetHeight < this.offset.height) {
          this.offset.height = element.offsetHeight
        }

        if (item.width.value > this.size.width) {
          this.size.width = item.width.value
        }

        if (item.height.value > this.size.height) {
          this.size.height = item.height.value
        }
      }
    })
  }

  private static updatePercent (): void {
    if (
      this.size.width ||
      this.size.height
    ) {
      const one = {
        width: this.size.width ? 1 / this.size.width : 0,
        height: this.size.height ? 1 / this.size.height : 0
      } as ImageItemSizeType

      let factorMax = 1 as number

      this.objectsAdaptive.forEach(item => {
        const element = item.element.value

        if (element) {
          item.setPercent(
            item.width ? item.width.value * one.width * (this.offset.width / element.offsetWidth) : 0,
            item.height ? item.height.value * one.height * (this.offset.height / element.offsetHeight) : 0
          )

          if (
            item.isVisible() &&
            item.factor.value < factorMax
          ) {
            factorMax = item.factor.value
          }
        }
      })

      this.factorMax.value = factorMax
    }
  }

  private static resetSize () {
    this.offset = {
      width: 16000,
      height: 16000
    }

    this.size = {
      width: 0,
      height: 0
    }
  }

  static {
    this.resetSize()
  }
}
