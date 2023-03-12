import { computed, Ref } from 'vue'
import { isSelected } from '../../functions'

import { ArrayOrStringType, RefType } from '../types'
import { ListDataType, ListItemType } from './types'

export class ListSelected {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly values: RefType<ListDataType>,
    private readonly selected?: Ref<ArrayOrStringType>,
    private readonly isFilter = false as boolean
  ) {
  }

  readonly item = computed<ListDataType>(() => {
    if (this.selected?.value) {
      const data = [] as ListDataType

      this.values.value.forEach(item => {
        if ('list' in item) {
          data.push(...this.getSubList(item, 'list'))
        } else if ('menu' in item) {
          data.push(...this.getSubList(item, 'menu'))
        } else if (isSelected(item.value, this.selected?.value)) {
          data.push(item)
        }
      })

      return data
    } else {
      return []
    }
  })

  is (): boolean {
    return this.item.value.length > 0
  }

  get (): ListDataType {
    return this.item.value
  }

  private getSubList (item: ListItemType, index: string): ListDataType {
    if (index in item) {
      if (this.isFilter) {
        return item[index]?.getSelectedFilter()
      } else {
        return item[index]?.getSelected()
      }
    } else {
      return []
    }
  }
}
