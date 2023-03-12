import { computed, ref } from 'vue'
import { ListSelected } from './ListSelected'

export class ListGroup {
  private readonly value = ref<boolean | undefined>(undefined)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly selected?: ListSelected
  ) {
  }

  readonly item = computed<boolean>(() => {
    if (this.value.value === undefined) {
      return this.selected?.is() || false
    } else {
      return this.value.value
    }
  })

  get (): boolean | undefined {
    return this.value.value
  }

  set (value: boolean): this {
    this.value.value = value
    return this
  }

  toggle (): this {
    this.value.value = !this.item.value
    return this
  }
}
