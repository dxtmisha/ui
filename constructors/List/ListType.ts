import { computed, Ref, UnwrapNestedRefs } from 'vue'
import { forEach, isSelected } from '../../functions'

import { List } from './List'

import { ArrayOrStringType, AssociativeType } from '../types'
import { ListDataType, ListItemType, ListTypeType } from './types'

export class ListType {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly listIn: List,
    private readonly props: UnwrapNestedRefs<any>,
    private readonly selected: Ref<ArrayOrStringType>,
    private readonly exclusionForItem: string[],
    private readonly exclusionForList: string[]
  ) {
  }

  readonly item = computed<ListDataType>(() => {
    const data = [] as ListDataType

    this.list.value.forEach(item => {
      if (isSelected(item.value, this.selected.value)) {
        data.push({
          ...item,
          selected: true
        })
      } else {
        data.push(item)
      }
    })

    return data
  })

  readonly list = computed<ListDataType>(() => {
    const data = [] as ListDataType

    this.listIn.getList().forEach(item => {
      const type = this.getType(item)
      const value = { type } as ListItemType

      switch (type) {
        case 'list':
          Object.assign(value, this.getDataList(item))
          break
        case 'item':
          Object.assign(value, this.getDataItem(item))
          break
      }

      data.push(value)
    })

    return data
  })

  get (): ListDataType {
    return this.item.value
  }

  private getType (item: ListItemType): ListTypeType {
    if ('list' in item) {
      return 'list'
    } else if ('menu' in item) {
      return 'menu'
    } else {
      return item?.type || 'item'
    }
  }

  private getDataItem (item: ListItemType): ListItemType {
    return {
      ...this.getDataProps(this.exclusionForItem),
      ...item
    }
  }

  private getDataList (item: ListItemType): ListItemType {
    return {
      ...this.getDataProps(this.exclusionForList),
      icon: '&nbsp;',
      ...item
    }
  }

  private getDataProps (exclusion: string[]): AssociativeType {
    const data = {} as AssociativeType

    forEach<any, string, void>(this.props, (value, index) => {
      if (
        exclusion.indexOf(index) === -1 &&
        value !== undefined
      ) {
        data[index] = value
      }
    })

    return data
  }
}
