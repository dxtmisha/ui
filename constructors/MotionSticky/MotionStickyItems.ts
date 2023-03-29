import { nextTick, onMounted, onUpdated } from 'vue'
import { MotionStickyElement } from './MotionStickyElement'

export type MotionStickyItemsPositionType = {
  item: HTMLDivElement
  rect: DOMRect
  top: number
  bottom: number
}

export class MotionStickyItems {
  private item?: NodeListOf<HTMLDivElement>

  constructor (
    protected readonly element: MotionStickyElement
  ) {
    onMounted(async () => await this.init())
    onUpdated(async () => await this.init())
  }

  get (): NodeListOf<HTMLDivElement> | undefined {
    return this.item
  }

  getPosition (): MotionStickyItemsPositionType[] {
    const data = [] as MotionStickyItemsPositionType[]

    this.get()?.forEach(item => {
      const style = getComputedStyle(item)
      const rect = item.getBoundingClientRect()

      data.push({
        item,
        rect,
        top: parseInt(style.top.replace(/[^0-9]/ig, '')) || 0,
        bottom: parseInt(style.bottom.replace(/[^0-9]/ig, '')) || 0
      })
    })

    return data
  }

  update () {
    this.item = this.element.getElement()?.querySelectorAll(`.${this.element.getId()}`)
  }

  private async init () {
    await nextTick()
    requestAnimationFrame(() => this.update())
  }
}
