import { Ref } from 'vue'
import { forEach } from '../../functions'

export type MotionCellSizeChildrenType = {
  element: Element
  rect: DOMRect
}

export class MotionCellItems {
  private children = [] as MotionCellSizeChildrenType[]

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly className: string,
    private readonly styleName: string
  ) {
  }

  is (target: HTMLElement): boolean {
    return !!target?.parentElement?.classList.contains(this.getClassName())
  }

  update (): void {
    this.children = []

    forEach(this.getChildren(), item => {
      const rect = item.getBoundingClientRect()

      if (
        rect.width > 0 ||
        rect.height > 0
      ) {
        this.children.push({
          element: item,
          rect
        })
      }
    })
  }

  async preparation (): Promise<void> {
    return new Promise(resolve => {
      requestAnimationFrame(() => {
        forEach(this.children, item => this.preparationItem(item))
        resolve()
      })
    })
  }

  remove (): void {
    forEach(this.children, item => this.removeItem(item.element))
    this.children = []
  }

  private getClassName (): string {
    return `${this.className}__item`
  }

  private getStyleName (name: string): string {
    return `${this.styleName}${name}`
  }

  private getChildren (): HTMLCollection {
    return this.element.value?.children || ({} as HTMLCollection)
  }

  private preparationItem (item: MotionCellSizeChildrenType): void {
    const element = item.element
    const rectNew = item.element.getBoundingClientRect()

    this
      .setProperty(element, 'top', `${item.rect.top - rectNew.top}px`)
      .setProperty(element, 'left', `${item.rect.left - rectNew.left}px`)
      .setProperty(element, 'width', `${item.rect.width}px`)
      .setProperty(element, 'height', `${item.rect.height}px`)
      .setProperty(element, 'width-to', `${rectNew.width}px`)
      .setProperty(element, 'height-to', `${rectNew.height}px`)

    element.classList.add(this.getClassName())
  }

  private setProperty (
    element: Element,
    name: string,
    value = null as string | null
  ): this {
    (element as HTMLElement).style.setProperty(this.getStyleName(name), value)
    return this
  }

  private removeItem (element: Element): void {
    this
      .removeProperty(element, 'top')
      .removeProperty(element, 'left')
      .removeProperty(element, 'width')
      .removeProperty(element, 'height')
      .removeProperty(element, 'width-to')
      .removeProperty(element, 'height-to')

    element.classList.remove(this.getClassName())
  }

  private removeProperty (
    element: Element,
    name: string
  ): this {
    (element as HTMLElement).style.removeProperty(this.getStyleName(name))
    return this
  }
}
