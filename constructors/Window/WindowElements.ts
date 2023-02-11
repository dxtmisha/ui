import { ComponentItem } from '../../classes/ComponentItem'
import { getIdElement } from '../../functions'

export class WindowElements {
  private readonly id = `window--id--${getIdElement()}`
  private readonly classControl: string
  private readonly classBody: string

  constructor (
    private readonly item: ComponentItem
  ) {
    this.classControl = item.getClassName(['control'])
    this.classBody = item.getClassName(['body'])
  }

  getId (): string {
    return this.id
  }

  getClassControl (): string {
    return this.classControl
  }

  getClassBody (): string {
    return this.classBody
  }

  getControl (): HTMLElement | undefined {
    return document.querySelector<HTMLElement>(`.${this.classControl}.${this.id}`) || undefined
  }

  getRect (): DOMRect | undefined {
    return this.getControl()?.getBoundingClientRect() || undefined
  }

  getBody (): HTMLDivElement | undefined {
    return document.querySelector<HTMLDivElement>(`.${this.item.getBasicClassName()}.${this.id} .${this.classBody}`) || undefined
  }
}
