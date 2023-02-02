import { isRef, ref, Ref } from 'vue'
import { ElementType, RefOrElementType, RefType } from '../constructors/types'

export class ElementItem<E = ElementType> {
  public readonly element: RefType<E | undefined>

  constructor (
    element?: RefOrElementType<E | undefined> | string
  ) {
    this.element = !isRef(element)
      ? ref(this.findElement(element)) as Ref<E>
      : element as RefType<E>
  }

  get (): E | undefined {
    return this.element.value
  }

  private findElement (element?: E | string): E {
    return (typeof element === 'string' ? document.querySelector(element) as E : element) || document.body as E
  }
}
