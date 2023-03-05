import { ComponentItem } from '../../classes/ComponentItem'
import { WindowStatus } from './WindowStatus'
import { getIdElement } from '../../functions'
import { WindowClassesControlType } from './types'

export class WindowElements {
  private readonly id = `window--id--${getIdElement()}`
  private readonly classControl: string
  private readonly classBody: string

  constructor (
    private readonly item: ComponentItem,
    private readonly status: WindowStatus
  ) {
    this.classControl = item.getClassName(['control'])
    this.classBody = item.getClassName(['body'])
  }

  getName (): string {
    return this.item.getBasicClassName()
  }

  getId (): string {
    return this.id
  }

  getClass (): object {
    return { [this.id]: true }
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
    return document.querySelector<HTMLDivElement>(`.${this.getName()}.${this.id} .${this.classBody}`) || undefined
  }

  getByStatus (name: keyof WindowClassesControlType): string {
    return `.${this.getId()} ${this.status.getClassByName(name)}`
  }
}
