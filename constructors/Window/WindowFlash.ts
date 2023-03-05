import { Ref } from 'vue'
import { WindowClient } from './WindowClient'
import { WindowElements } from './WindowElements'

export class WindowFlash {
  private control = false as boolean

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly elements: WindowElements,
    private readonly client: WindowClient,
    private readonly flash?: Ref<boolean>
  ) {
  }

  is (): boolean {
    return !!this.flash?.value
  }

  isOpen (): boolean {
    return this.is() || this.control
  }

  isHide (): boolean {
    return this.is() ||
      !!document.querySelector(`.${this.elements.getName()}[data-status="hide"]`) ||
      !!document.querySelector(`.${this.elements.getName()}[data-status="close"]`)
  }

  setControl (target?: HTMLElement): void {
    this.control = target?.closest<HTMLElement>(`.${this.elements.getClassControl()}`)?.dataset.window === this.elements.getId()
  }
}
