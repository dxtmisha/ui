import { MotionCellGo } from './MotionCellGo'
import { MotionCellItems } from './MotionCellItems'

export type MotionCellToSetupType = {
  to: (callback: () => void) => void
}

export class MotionCellTo {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly go: MotionCellGo,
    private readonly items: MotionCellItems
  ) {
  }

  async to (callback: () => void): Promise<void> {
    this.items.update()

    await callback()
    await this.items.preparation()

    this.go.go()
  }

  on (event: TransitionEvent) {
    const target = event.target as HTMLElement

    if (
      event.propertyName === 'transform' &&
      this.items.is(target)
    ) {
      requestAnimationFrame(() => {
        this.go.reset()
        this.items.remove()
      })

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()
    }
  }

  getSetup (): MotionCellToSetupType {
    return {
      to: (callback: () => void) => this.to(callback)
    }
  }
}
