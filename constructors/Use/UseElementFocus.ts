import { computed, Ref } from 'vue'
import { getElement } from '../../functions'

import { AssociativeType, ElementType } from '../types'

export class UseElementFocus {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly element: Ref<(HTMLDivElement & AssociativeType) | undefined>,
    protected readonly elementFocus: Ref<ElementType | string | undefined>
  ) {
  }

  readonly item = computed<HTMLElement>(() => {
    if (
      this.elementFocus.value === window ||
      this.elementFocus.value === 'body'
    ) {
      return document.documentElement
    } else {
      return (
        getElement(this.elementFocus) ||
        this.getElement() ||
        document.documentElement
      ) as HTMLElement
    }
  })

  readonly itemByEvent = computed<ElementType>(
    () => this.item.value === document.documentElement ? window : this.item.value
  )

  get (): HTMLElement {
    return this.item.value
  }

  getElement (): HTMLDivElement | undefined {
    return this.element.value?.element || this.element.value
  }

  getChildren (): HTMLCollection | undefined {
    return this.getElement()?.children
  }
}
