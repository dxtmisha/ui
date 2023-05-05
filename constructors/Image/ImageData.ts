import { computed, ref, Ref, watchEffect } from 'vue'
import { FileImage } from '../../classes/FileImage'
import { Icon } from './Icon'

import {
  ImageItemType,
  NumberOrStringType
} from '../types'
import { ImageTypeType, ImageValueType } from '../typesRef'

export class ImageData {
  private readonly item = ref<ImageItemType | string | undefined>()

  constructor (
    private readonly type: ImageTypeType,
    private readonly image: ImageValueType,
    private readonly url: Ref<string>
  ) {
    watchEffect(() => this.update())
  }

  private readonly src = computed<string | null>(() => {
    if (typeof this.item.value === 'string') {
      return `url("${this.item.value}")`
    } else if (this.item.value) {
      return `url("${this.item.value.src}")`
    } else {
      return null
    }
  })

  is (): boolean {
    return this.item.value !== undefined
  }

  isLink (): boolean {
    return this.is() && typeof this.item.value === 'string'
  }

  isImage (): boolean {
    return this.is() && typeof this.item.value !== 'string'
  }

  get (): Ref<ImageItemType | string | undefined> {
    return this.item
  }

  getSize (width: NumberOrStringType, height: NumberOrStringType): string | undefined {
    if (this.isImage()) {
      const item = this.item.value as ImageItemType
      return item.height < item.width ? `auto ${height}` : `${width} auto`
    } else {
      return undefined
    }
  }

  getSrc (): string | null {
    return this.src.value
  }

  private async update (): Promise<void> {
    switch (this.type.value) {
      case 'image':
      case 'file':
        this.item.value = await FileImage.createImage(this.image.value)
        break
      case 'public':
        this.item.value = Icon.get(
          this.image.value as string,
          this.url.value
        )
        break
      default:
        this.item.value = undefined
        break
    }
  }
}
