import { computed, Ref } from 'vue'
import { forEach, isFilled, isSelected } from '../../functions/data'

import { ListType } from './ListType'

import { ArrayOrStringType, AssociativeType } from '../types'
import { ListDataType, ListItemType } from './types'

export class ListStatus {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly list: ListType,
    private readonly focus?: Ref<ArrayOrStringType>,
    private readonly highlight?: Ref<ArrayOrStringType>,
    private readonly selected?: Ref<ArrayOrStringType>
  ) {
  }

  readonly item = computed<ListDataType>(() => forEach(this.list.get(), item => this.getStatus(item)))

  get (): ListDataType {
    return this.item.value
  }

  private getStatus (item: ListItemType): ListItemType {
    let isStatus = false
    const data = {} as AssociativeType<boolean>
    const statusList = {
      focus: this.focus,
      highlight: this.highlight,
      selected: this.selected
    }

    forEach(statusList, (status, index) => {
      if (
        isFilled(status?.value) &&
        isSelected(item.value, status?.value)
      ) {
        data[index] = true
        isStatus = true
      }
    })

    return isStatus ? { ...item, ...data } : item
  }
}
