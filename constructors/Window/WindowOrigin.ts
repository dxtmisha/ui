import { computed, ref, Ref } from 'vue'
import { WindowElements } from './WindowElements'
import { WindowClient } from './WindowClient'
import { WindowPosition } from './WindowPosition'

export class WindowOrigin {
  private readonly x = ref(null) as Ref<number | null>
  private readonly y = ref(null) as Ref<number | null>

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly elements: WindowElements,
    private readonly client: WindowClient,
    private readonly position: WindowPosition,
    private readonly className: string
  ) {
  }

  private readonly styleX = computed<string | null>(() => this.x.value !== null ? `${this.x.value}px` : null)
  private readonly styleY = computed<string | null>(() => this.y.value !== null ? `${this.y.value}px` : null)

  getStyle (): object {
    return {
      [`${this.className}origin-x`]: this.styleX,
      [`${this.className}origin-y`]: this.styleY
    }
  }

  update (): this {
    if (
      this.element.value &&
      getComputedStyle(this.element.value).content !== '"--MENU--"'
    ) {
      const rect = this.elements.getBody()?.getBoundingClientRect()

      if (rect) {
        this.x.value = this.client.getShiftX(rect.left)
        this.y.value = this.client.getShiftY(rect.top)
      }
    } else {
      this.x.value = this.client.getShiftX(this.position.getX())
      this.y.value = this.client.getShiftY(this.position.getY())
    }

    return this
  }

  restart (): this {
    this.x.value = null
    this.y.value = null

    return this
  }
}
