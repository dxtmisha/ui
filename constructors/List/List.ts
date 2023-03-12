import { computed, isRef, Ref } from 'vue'
import { forEach } from '../../functions'

import { ListFilter } from './ListFilter'
import { ListGroup } from './ListGroup'
import { ListSelected } from './ListSelected'
import { ListSort } from '../ListItem/ListSort'

import { ArrayOrStringType, AssociativeType } from '../types'
import { ListDataType, ListItemType, ListValuesType, ListValueType } from './types'

export class List {
  private readonly filterItem: ListFilter
  private readonly sortItem: ListSort

  private readonly selectedItem: ListSelected
  private readonly selectedFilterItem: ListSelected

  private readonly group: ListGroup

  constructor (
    private readonly values: ListValuesType,
    private readonly rename?: Ref<AssociativeType>,
    private readonly selected?: Ref<ArrayOrStringType>,
    private readonly filter?: Ref<string>,
    private readonly filterIndex?: Ref<ArrayOrStringType>,
    private readonly sort?: Ref<string>,
    private readonly desc?: Ref<boolean>,
    private readonly addText = true
  ) {
    this.filterItem = new ListFilter(
      this.item,
      this.filter,
      this.filterIndex
    )
    this.sortItem = new ListSort(
      this.filterItem.item,
      this.sort,
      this.desc
    )

    this.selectedItem = new ListSelected(
      this.item,
      this.selected
    )
    this.selectedFilterItem = new ListSelected(
      this.filterItem.item,
      this.selected,
      true
    )

    this.group = new ListGroup(this.selectedFilterItem)
  }

  readonly item = computed<ListDataType>(() => {
    return forEach<ListValueType, string, ListItemType>(
      this.getList(),
      (item, index) => this.toObject(item, index)
    )
  })

  get (): ListDataType {
    return this.item.value
  }

  getSelected (): ListDataType {
    return this.selectedItem.get()
  }

  getSelectedFilter (): ListDataType {
    return this.selectedFilterItem.get()
  }

  private getList (): ListValueType {
    return (isRef(this.values) ? this.values.value : this.values) || []
  }

  private getIndex (index: string): string {
    return this.rename?.value?.[index] || index
  }

  private toObject (item: AssociativeType, index: string): ListItemType {
    const data = this.initData(item) as ListItemType

    if (!('value' in data)) {
      data.value = index
    }

    if (!('text' in data) && this.addText) {
      data.text = data.value
    }

    this.initDataList(data, 'list')
    this.initDataList(data, 'menu')

    return data
  }

  private initData (item: AssociativeType): AssociativeType {
    if (this.rename) {
      const data = {} as AssociativeType

      forEach<any, string, void>(item, (value, index) => {
        data[this.getIndex(index)] = value
      })

      return data
    } else if (typeof item !== 'object') {
      return { value: item }
    } else {
      return item
    }
  }

  private initDataList (data: AssociativeType, index: string): void {
    if (index in data) {
      data[index] = new List(
        data[index],
        this.rename,
        this.selected,
        this.filter,
        this.filterIndex,
        this.sort,
        this.desc,
        this.addText
      )
    }
  }

  static init (
    values: List | ListValuesType,
    rename?: Ref<AssociativeType>,
    selected?: Ref<ArrayOrStringType>,
    filter?: Ref<string>,
    filterIndex?: Ref<ArrayOrStringType>,
    sort?: Ref<string>,
    desc?: Ref<boolean>,
    addText = true
  ): List {
    if (values instanceof List) {
      return values
    } else {
      return new List(
        values,
        rename,
        selected,
        filter,
        filterIndex,
        sort,
        desc,
        addText
      )
    }
  }
}
