import { computed, Ref } from 'vue'
import { ImageAdaptiveObject } from './ImageAdaptiveObject'
import { ImageCoordinator } from './ImageCoordinator'
import { ImageData } from './ImageData'
import { isFilled } from '../../functions'

import {
  ImageCoordinatorType,
  ImageOptionType,
  ImageTypeType,
  ImageValueType
} from '../types'

export class Image {
  private readonly data: ImageData
  private readonly adaptiveItem: ImageAdaptiveObject
  private readonly coordinatorItem: ImageCoordinator

  constructor (
    private readonly element: Ref<HTMLElement | undefined>,
    private readonly image: ImageValueType,
    private readonly coordinator: ImageCoordinatorType,
    private readonly size: ImageOptionType,
    private readonly x: ImageOptionType,
    private readonly y: ImageOptionType,
    private readonly adaptive: Ref<boolean>,
    private readonly width: Ref<number>,
    private readonly height: Ref<number>,
    private readonly url: Ref<string>
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

    this.coordinatorItem = new ImageCoordinator(
      this.coordinator,
      this.x,
      this.y
    )
  }

  destructor (): void {
    this.adaptiveItem.remove()
  }

  readonly classes = computed<object>(() => {
    const type = this.type.value
    const data = { [`is-type--${type}`]: type !== undefined }

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
      case 'file':
      case 'image':
        return {
          'background-image': this.data.getSrc(),
          'background-size': this.backgroundSize.value,
          'background-position-x': this.coordinatorItem.getPositionX(),
          'background-position-y': this.coordinatorItem.getPositionY()
        }
      case 'public':
        return { 'mask-image': this.data.getSrc() }
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

  private readonly type = computed(() => {
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

  private readonly backgroundSize = computed<string | undefined>(() => {
    const size = this.size.value

    if (this.coordinatorItem.is()) {
      const coordinatorSize = this.coordinatorItem.getSize()
      return this.data.getSize(coordinatorSize.width, coordinatorSize.height)
    } else if (this.adaptiveItem.is()) {
      return this.adaptiveItem.getSize()
    } else if (size && isFilled(size)) {
      return size.toString().match(/%$/) ? this.data.getSize(size, size) : size.toString()
    } else {
      return undefined
    }
  })
}
