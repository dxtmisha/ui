import { ref, Ref } from 'vue'
import { WindowElements } from './WindowElements'
import { WindowClient } from './WindowClient'

export class WindowOrigin {
  private readonly originX = ref(null) as Ref<number | null>
  private readonly originY = ref(null) as Ref<number | null>

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly elements: WindowElements,
    private readonly client: WindowClient
  ) {
  }

  private update (): this {
    if (
      this.element.value &&
      getComputedStyle(this.element.value).content !== '"--MENU--"'
    ) {
      const rect = this.elements.getBody()?.getBoundingClientRect()

      if (rect) {
        this.originX.value = this.client.getShiftX(rect.left)
        this.originY.value = this.client.getShiftY(rect.top)
      }
    } else {
      this.originX.value = this.client.x ? this.client.x - this.positionX.value : null
      this.originY.value = this.client.y ? this.client.y - this.positionY.value : null
    }

    return this
  }
}
