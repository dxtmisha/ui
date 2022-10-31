import { computed, ComputedRef, ref, Ref, watchEffect } from 'vue'
import { Icon } from './Icon'
import { createImage, isFilled } from '../../functions'
import {
  ImageCoordinatorType,
  ImageItemType,
  ImageItemSizeType,
  ImageOptionType,
  ImageTypeType,
  ImageValueType,
  NumberOrStringType
} from '../types'

export class Image {
  readonly dataImage: Ref<ImageItemType | string | undefined>
  readonly adaptiveX: Ref<number>
  readonly adaptiveY: Ref<number>

  constructor (
    public readonly image: ImageValueType,
    public readonly coordinator: ImageCoordinatorType,
    public readonly size: ImageOptionType,
    public readonly x: ImageOptionType,
    public readonly y: ImageOptionType,
    public readonly adaptive: Ref<boolean>,
    public readonly url: Ref<string>,
    public readonly className: string
  ) {
    this.dataImage = ref(undefined)
    this.adaptiveX = ref(0)
    this.adaptiveY = ref(0)

    watchEffect(() => this.update())
  }

  private async update () {
    switch (this.type.value) {
      case 'image':
      case 'file':
        this.dataImage.value = await createImage(this.image.value)
        break
      case 'public':
        return Icon.get(
          this.image.value as string,
          this.url.value
        )
    }
  }

  public readonly backgroundImage = computed(() => {
    const dataImage = this.dataImage.value

    return dataImage ? `url("${typeof dataImage === 'string' ? dataImage : dataImage.src}")` : null
  }) as ComputedRef<string | null>

  public readonly backgroundSize = computed(() => {
    const coordinatorSize = this.coordinatorSize.value
    const size = this.size.value
    const adaptiveX = this.adaptiveX.value
    const adaptiveY = this.adaptiveY.value

    if (coordinatorSize) {
      return this.getSizeImage(
        100 / coordinatorSize.width * 100,
        100 / coordinatorSize.height * 100
      )
    } else if (adaptiveX) {
      return `${adaptiveX}% auto`
    } else if (adaptiveY) {
      return `auto ${adaptiveY}%`
    } else if (size && isFilled(size)) {
      return size.toString().match(/%$/) ? this.getSizeImage(size, size) : size
    } else {
      return undefined
    }
  }) as ComputedRef<string | undefined>

  public readonly classes = computed(() => {
    const type = this.type.value
    const data = { [`is-type--${type}`]: true }

    switch (type) {
      case 'la':
      case 'lab':
        if (typeof this.image.value === 'string') {
          data[`lab ${this.image.value.replace('lab-', 'la-')}`] = true
        }

        break
      case 'filled':
      case 'outlined':
      case 'round':
      case 'sharp':
      case 'two-tone':
      case 'material':
        data['material-icons'] = true
        break
      case 'public':
        data['is-public'] = true
        break
    }

    return data
  }) as ComputedRef<object>

  public readonly coordinatorSize = computed(() => {
    const coordinator = this.coordinator.value

    if (coordinator) {
      return {
        width: 100 - coordinator?.[1] - coordinator?.[3],
        height: 100 - coordinator?.[2] - coordinator?.[0]
      }
    } else {
      return undefined
    }
  }) as ComputedRef<ImageItemSizeType | undefined>

  public readonly styles = computed(() => {
    const image = this.image.value

    switch (this.type.value) {
      case 'image':
        return {
          'background-image': this.backgroundImage.value,
          'background-size': this.backgroundSize.value
        }
      case 'public':
        return { 'mask-image': this.backgroundImage.value }
      case 'color':
        return { 'background-color': image }
    }

    return undefined
  })

  public text = computed(() => {
    const image = this.image.value
    const type = this.type.value

    if (
      type &&
      typeof image === 'string' &&
      [
        'filled',
        'outlined',
        'round',
        'sharp',
        'two-tone',
        'material'
      ].indexOf(type) !== -1
    ) {
      return image.replace(/^(filled|outlined|round|sharp|two-tone)-/, '')
    } else {
      return undefined
    }
  }) as ImageOptionType

  public readonly type = computed(() => {
    const image = this.image.value

    if (image) {
      if (image instanceof File) {
        return 'file'
      } else if (image.match(/\//)) {
        return 'image'
      } else if (image.match(/^#/)) {
        return 'color'
      } else if (image.match(/^@/)) {
        return 'public'
      } else {
        return image.match(/^(la|lab|filled|outlined|round|sharp|two-tone)-/)?.[1] || 'material'
      }
    } else {
      return undefined
    }
  }) as ImageTypeType

  protected getSizeImage (width: NumberOrStringType, height: NumberOrStringType): string | undefined {
    const dataImage = this.dataImage.value

    if (dataImage && typeof dataImage !== 'string') {
      return dataImage.height < dataImage.width ? `auto ${height}` : `${width} auto`
    } else {
      return undefined
    }
  }
}
