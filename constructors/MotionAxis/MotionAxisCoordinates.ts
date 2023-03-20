import { ref } from 'vue'
import { MotionAxisStatus } from './MotionAxisStatus'

export class MotionAxisCoordinates {
  private readonly top = ref<string | null>(null)
  private readonly left = ref<string | null>(null)
  private readonly width = ref<string | null>(null)
  private readonly height = ref<string | null>(null)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly status: MotionAxisStatus,
    private readonly className: string
  ) {
  }

  getStyle (): object {
    return {
      [`${this.className}top`]: this.top,
      [`${this.className}left`]: this.left,
      [`${this.className}width`]: this.width,
      [`${this.className}height`]: this.height
    }
  }

  update (): this {
    const rect = this.getRect()

    if (rect) {
      this.top.value = `${rect.top}px`
      this.left.value = `${rect.left}px`
      this.width.value = `${rect.width}px`
      this.height.value = `${rect.height}px`
    }

    return this
  }

  resize (): this {
    this.top.value = null
    this.left.value = null
    this.width.value = null
    this.height.value = null

    return this
  }

  private getRect (): DOMRect | undefined {
    return this.status.getElementPreparation()?.element?.element?.getBoundingClientRect() || undefined
  }
}
