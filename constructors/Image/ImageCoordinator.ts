import { ImageItemSizeType } from '../types'
import { computed } from 'vue'
import { ImageCoordinatorType, ImageOptionType } from '../typesRef'

export class ImageCoordinator {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly coordinator: ImageCoordinatorType,
    private readonly x: ImageOptionType,
    private readonly y: ImageOptionType
  ) {
  }

  private readonly item = computed<ImageItemSizeType>(() => {
    const coordinator = this.getCoordinator()

    return {
      width: 100 - coordinator[1] - coordinator[3],
      height: 100 - coordinator[2] - coordinator[0]
    }
  })

  private readonly positionX = computed<string | number | null>(() => {
    if (this.is()) {
      return `${this.getCoordinator()[3] + (this.get().width / 2)}%`
    } else {
      return this.x.value || null
    }
  })

  private readonly positionY = computed<string | number | null>(() => {
    if (this.is()) {
      return `${this.getCoordinator()[0] + (this.get().height / 2)}%`
    } else {
      return this.y.value || null
    }
  })

  is () {
    return Array.isArray(this.coordinator.value) && this.coordinator.value.length === 4
  }

  get (): ImageItemSizeType {
    return this.item.value
  }

  getCoordinator (): [number, number, number, number] {
    return (this.coordinator.value || [0, 0, 0, 0])
  }

  getSize (): ImageItemSizeType<string> {
    return {
      width: `${100 / this.get().width * 100}%`,
      height: `${100 / this.get().height * 100}%`
    }
  }

  getPositionX (): string | number | null {
    return this.positionX.value
  }

  getPositionY (): string | number | null {
    return this.positionY.value
  }
}
