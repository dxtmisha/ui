import { ref, Ref, watch } from 'vue'
import { ImageItemType } from '../types'

export const MAX_BEYOND = 256
export const MAX_TIMEOUT = 128

export class ImageAdaptive {
  private readonly percentWidth: Ref<number>
  private readonly percentHeight: Ref<number>
  private readonly size: Ref<string | undefined>

  private beyond = false as boolean
  private visible = false as boolean

  constructor (
    private element: Ref<HTMLElement | undefined>,
    private adaptive: Ref<boolean>,
    private data: Ref<ImageItemType>,
    private width: Ref<number>,
    private height: Ref<number>
  ) {
    this.percentWidth = ref(0)
    this.percentHeight = ref(0)
    this.size = ref(undefined)

    ImageObjectsAdaptive.add(this)

    watch([
      this.element,
      this.adaptive,
      this.data,
      this.width,
      this.height
    ], () => ImageObjectsAdaptive.init)
  }

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
}

class ImageObjectsAdaptive {
  private static objects = [] as ImageAdaptive[]
  private static time?: number
  private static oldVisible?: string

  static add (object: ImageAdaptive): void {
    this.objects.push(object)
    this.init()
  }

  static init (): void {
    this.preparation(32)
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
    }
  }

  private static updateVisible (): void {
    let indexSum = ''

    this.objects.forEach((item, index) => {
      if (item.isBeyond()) {
        indexSum += `[${index.toString()}]`
      }
    })

    if (this.oldVisible !== indexSum) {
      this.oldVisible = indexSum
      console.log('indexSum', indexSum)
    }
  }
}
