import { computed, Ref } from 'vue'
import { To } from '../../classes/To'
import { getExp, isFilled } from '../../functions'

import { ArrayOrStringType, RefType } from '../types'
import { ListDataType, ListItemType } from './types'

export class ListFilter {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly values: RefType<ListDataType>,
    private readonly filter?: Ref<string>,
    private readonly filterIndex?: Ref<ArrayOrStringType>
  ) {
  }

  readonly item = computed(() => {
    if (isFilled(this.filter?.value)) {
      return this.values.value.filter(item => this.isFind(item))
    } else {
      return this.values.value
    }
  })

  readonly index = computed<string[]>(() => To.array(this.filterIndex?.value || ['text', 'value']))

  private isFind (item: ListItemType): boolean {
    return !!this.index.value.find(
      value => item?.[value]?.match(getExp(this.filter?.value || '', 'i', '(:value)'))
    )
  }
}
