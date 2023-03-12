import { computed, Ref } from 'vue'

import { RefType } from '../types'
import { ListDataType } from '../List/types'

export class ListSort {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly values: RefType<ListDataType>,
    private readonly sort?: Ref<string>,
    private readonly desc?: Ref<boolean>
  ) {
  }

  readonly item = computed<ListDataType>(() => {
    if (this.sort?.value) {
      return this.values.value.sort((a, b) => {
        if (this.desc?.value) {
          return a?.[this.sort?.value || 'value'] < b?.[this.sort?.value || 'value'] ? 1 : -1
        } else {
          return a?.[this.sort?.value || 'value'] < b?.[this.sort?.value || 'value'] ? -1 : 1
        }
      })
    } else {
      return this.values.value
    }
  })

  get (): ListDataType {
    return this.item.value
  }
}
