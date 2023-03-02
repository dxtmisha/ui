import { ref } from 'vue'
import { forEach, getExp, strFill } from '../../functions'
import { AssociativeType } from '../types'

export class MaskRubberItem {
  protected readonly item = ref<AssociativeType<number>>({})

  is (index: string): boolean {
    return index in this.item.value
  }

  get (): AssociativeType<number> {
    return this.item.value
  }

  getItem (index: string): number {
    return this.item.value?.[index] || 0
  }

  add (index: string): this {
    this.item.value[index] = this.getItem(index) + 1
    return this
  }

  pop (index: string): boolean {
    if (this.is(index)) {
      if (--this.item.value[index] <= 0) {
        delete this.item.value[index]
      }

      return true
    }

    return false
  }

  reset (): this {
    this.item.value = {}
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
}
