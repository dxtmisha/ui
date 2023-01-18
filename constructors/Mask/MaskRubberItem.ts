import { ref } from 'vue'
import { AssociativeType } from '../types'
import { forEach, getExp, strFill } from '../../functions'

export class MaskRubberItem {
  protected readonly item = ref<AssociativeType<number>>({})

  add (index: string): this {
    if (index in this.item.value) {
      this.item.value[index]++
    } else {
      this.item.value[index] = 1
    }

    return this
  }

  get (index: string): number {
    return this.item.value?.[index] || 0
  }

  getItem (): AssociativeType<number> {
    return this.item.value
  }

  getMask (mask?: string): string {
    let value = mask || ''

    forEach<number, string, void>(this.item.value, (length, index) => {
      value = value.replace(
        getExp(index, 'ig', '([:value]+)'),
        (all: string) => `${all}${strFill(index, length)}`
      )
    })

    return value
  }

  is (index: string): boolean {
    return index in this.item.value
  }

  pop (index: string): this {
    if (
      index in this.item.value &&
      --this.item.value[index] <= 0
    ) {
      delete this.item.value[index]
    }

    return this
  }
}
