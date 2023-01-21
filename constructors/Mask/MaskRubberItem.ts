import { ref } from 'vue'
import { forEach, getExp, strFill } from '../../functions'
import { AssociativeType } from '../types'

export class MaskRubberItem {
  protected readonly item = ref<AssociativeType<number>>({})

  add (index: string): this {
    this.item.value[index] = this.getItem(index) + 1
    return this
  }

  expandMask (mask: string): string {
    let value = mask

    forEach<number, string, void>(this.item.value, (length, index) => {
      value = value.replace(
        getExp(index, 'ig', '([:value]+)'),
        (all: string) => `${all}${strFill(index, length)}`
      )
    })

    return value
  }

  get (): AssociativeType<number> {
    return this.item.value
  }

  getItem (index: string): number {
    return this.item.value?.[index] || 0
  }

  is (index: string): boolean {
    return index in this.item.value
  }

  pop (index: string): this {
    if (this.is(index) && --this.item.value[index] <= 0) {
      delete this.item.value[index]
    }

    return this
  }
}
