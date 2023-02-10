import { Ref, watchEffect } from 'vue'
import { ImageAdaptive } from './ImageAdaptive'
import { ImageAdaptiveItem } from './ImageAdaptiveItem'
import { ImageData } from './ImageData'
import { ImageItemType } from '../types'

export class ImageAdaptiveObject {
  private item?: ImageAdaptiveItem

  constructor (
    private readonly element: Ref<HTMLElement | undefined>,
    private readonly adaptive: Ref<boolean>,
    private readonly data: ImageData,
    private readonly width: Ref<number>,
    private readonly height: Ref<number>
  ) {
    watchEffect(() => this.update())
  }

  is (): boolean {
    return this.adaptive.value && this.data.isImage()
  }

  getSize () {
    return this.item?.backgroundSize.value
  }

  remove (): void {
    if (this.item) {
      ImageAdaptive.remove(this.item)
    }
  }

  private update (): void {
    this.remove()

    if (this.is()) {
      this.item = ImageAdaptive.add(
        this.element,
        this.adaptive,
        this.data.get() as Ref<ImageItemType>,
        this.width,
        this.height
      )
    }
  }
}
