import { UseElementFocus } from '../Use/UseElementFocus'
import { forEach } from '../../functions/data'
import { getIdElement } from '../../functions/element'

export type MotionScrollFocusItemType = {
  element: HTMLElement | undefined
  page: string
  isFirst: boolean
  isLast: boolean
}

export class MotionScrollFocus {
  private focus = '' as string
  private focusElement: HTMLElement | undefined

  private first = '' as string
  private last = '' as string

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: UseElementFocus
  ) {
  }

  is (): boolean {
    return this.focus !== ''
  }

  isNew (page: string | undefined): boolean {
    return this.focus !== page
  }

  isFirst (): boolean {
    return this.focus === this.first
  }

  isLast (): boolean {
    return this.focus === this.last
  }

  get (): string {
    return this.focus
  }

  getElement (): HTMLElement | undefined {
    return this.focusElement
  }

  getFirst (): string {
    return this.first
  }

  getLast (): string {
    return this.last
  }

  getData (): MotionScrollFocusItemType | undefined {
    if (this.is()) {
      return {
        element: this.getElement(),
        page: this.get(),
        isFirst: this.isFirst(),
        isLast: this.isLast()
      }
    } else {
      return undefined
    }
  }

  update (): this {
    const central = this.getCentral()
    const children = this.element.getChildren()

    this.reset()

    if (children) {
      forEach<HTMLElement, string, void>(children, item => {
        if (this.first === '') {
          this.first = this.getPage(item)
        }

        if (item.offsetTop < central) {
          this.focusElement = item
          this.focus = this.getPage(item)
        }

        this.last = this.getPage(item)
      })
    }

    return this
  }

  reset (): this {
    this.focus = ''
    this.focusElement = undefined

    this.first = ''
    this.last = ''

    return this
  }

  private getCentral (): number {
    const element = this.element.get()
    return element.scrollTop + (element.clientHeight / 2)
  }

  private getPage (item: HTMLElement): string {
    return item.dataset?.page || getIdElement(item) || ''
  }
}
