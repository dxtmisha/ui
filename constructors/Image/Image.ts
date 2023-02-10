import { computed, ref, Ref } from 'vue'
import { ImageAdaptiveObject } from './ImageAdaptiveObject'
import { ImageData } from './ImageData'
import { isFilled } from '../../functions'

import {
  ImageCoordinatorType,
  ImageItemType,
  ImageItemSizeType,
  ImageOptionType,
  ImageTypeType,
  ImageValueType
} from '../types'

export class Image {
  readonly data: ImageData
  readonly adaptiveItem: ImageAdaptiveObject

  readonly dataImage: Ref<ImageItemType | string | undefined>

  readonly adaptiveWidth: Ref<number>
  readonly adaptiveHeight: Ref<number>

  constructor (
    public readonly element: Ref<HTMLElement | undefined>,
    public readonly image: ImageValueType,
    public readonly coordinator: ImageCoordinatorType,
    public readonly size: ImageOptionType,
    public readonly x: ImageOptionType,
    public readonly y: ImageOptionType,
    public readonly adaptive: Ref<boolean>,
    public readonly width: Ref<number>,
    public readonly height: Ref<number>,
    public readonly url: Ref<string>
  ) {
    this.data = new ImageData(
      this.type,
      this.image,
      this.url
    )

    this.adaptiveItem = new ImageAdaptiveObject(
      this.element,
      this.adaptive,
      this.data,
      this.width,
      this.height
    )

    this.dataImage = ref(undefined)

    this.adaptiveWidth = ref(0)
    this.adaptiveHeight = ref(0)
  }

  destructor (): void {
    this.adaptiveItem.remove()
  }

  readonly classes = computed<object>(() => {
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
    }

    return data
  })

  readonly styles = computed<object | undefined>(() => {
    const image = this.image.value

    switch (this.type.value) {
      case 'image':
        return {
          'background-image': this.backgroundImage.value,
          'background-size': this.backgroundSize.value,
          'background-position-x': this.positionX.value,
          'background-position-y': this.positionY.value
        }
      case 'public':
        return { 'mask-image': this.backgroundImage.value }
      case 'color':
        return { 'background-color': image }
    }

    return undefined
  })

  readonly text = computed(() => {
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

  protected readonly type = computed(() => {
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

  readonly isShow = computed<boolean>(() => {
    switch (this.type.value) {
      case 'image':
      case 'file':
        return !!(
          this.data.is() && (
            !this.adaptive.value || this.backgroundSize.value
          )
        )
      default:
        return true
    }
  })

  readonly backgroundImage = computed<string | null>(() => this.data.getSrc())

  readonly backgroundSize = computed<string | undefined>(() => {
    const coordinatorSize = this.coordinatorSize.value
    const size = this.size.value

    if (coordinatorSize) {
      return this.data.getSize(
        `${100 / coordinatorSize.width * 100}%`,
        `${100 / coordinatorSize.height * 100}%`
      )
    } else if (this.adaptiveItem.is()) {
      return this.adaptiveItem.getSize()
    } else if (size && isFilled(size)) {
      return size.toString().match(/%$/) ? this.data.getSize(size, size) : size.toString()
    } else {
      return undefined
    }
  })

  readonly coordinatorSize = computed<ImageItemSizeType | undefined>(() => {
    const coordinator = this.coordinator.value

    if (coordinator) {
      return {
        width: 100 - coordinator?.[1] - coordinator?.[3],
        height: 100 - coordinator?.[2] - coordinator?.[0]
      }
    } else {
      return undefined
    }
  })

  private readonly positionX = computed<string | number | null>(() => {
    const coordinator = this.coordinator.value
    const coordinatorSize = this.coordinatorSize.value

    if (
      coordinator &&
      coordinatorSize
    ) {
      return `${coordinator?.[3] + (coordinatorSize.width / 2)}%`
    } else {
      return this.x.value || null
    }
  })

  private readonly positionY = computed<string | number | null>(() => {
    const coordinator = this.coordinator.value
    const coordinatorSize = this.coordinatorSize.value

    if (
      coordinator &&
      coordinatorSize
    ) {
      return `${coordinator?.[0] + (coordinatorSize.height / 2)}%`
    } else {
      return this.y.value || null
    }
  })
}
