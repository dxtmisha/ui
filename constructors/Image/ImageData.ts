import { ref, Ref, watchEffect } from 'vue'
import { Icon } from './Icon'
import { createImage } from '../../functions'
import { ImageItemType, ImageTypeType, ImageValueType, NumberOrStringType } from '../types'

export class ImageData {
  private readonly item = ref<ImageItemType | string | undefined>()

  constructor (
    private readonly type: ImageTypeType,
    private readonly image: ImageValueType,
    private readonly url: Ref<string>
  ) {
    watchEffect(() => this.update())
  }

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
    if (typeof this.item.value === 'string') {
      return `url("${this.item.value}")`
    } else if (this.item.value) {
      return `url("${this.item.value.src}")`
    } else {
      return null
    }
  }

  private async update (): Promise<void> {
    switch (this.type.value) {
      case 'image':
      case 'file':
        this.item.value = await createImage(this.image.value)
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
