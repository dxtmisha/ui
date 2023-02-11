import { ComponentItem } from '../../classes/ComponentItem'
import { getIdElement } from '../../functions'

export class WindowElements {
  private readonly id = `window--id--${getIdElement()}`
  private readonly classBody: string

  constructor (
    private readonly item: ComponentItem
  ) {
    this.classBody = item.getClassName(['body'])
  }

  getId (): string {
    return this.id
  }

  getBody (): Element | undefined {
    return document.querySelector(`.${this.item.getBasicClassName()}.${this.id} .${this.classBody}`) || undefined
  }
}
