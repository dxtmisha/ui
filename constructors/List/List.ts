import { computed, isRef, Ref } from 'vue'
import { forEach } from '../../functions'

import { ListFilter } from './ListFilter'
import { ListGroup } from './ListGroup'

import { ArrayOrStringType, AssociativeType } from '../types'
import { ListDataType, ListItemType, ListValuesType, ListValueType } from './types'

export class List {
  private readonly filterItem: ListFilter
  private readonly group: ListGroup

  constructor (
    private readonly values: ListValuesType,
    private readonly rename?: Ref<AssociativeType>,
    private readonly filter?: Ref<string>,
    private readonly filterIndex?: Ref<ArrayOrStringType>,
    private readonly sort?: Ref<string>,
    private readonly desc?: Ref<boolean>,
    private readonly addText = true
  ) {
    this.filterItem = new ListFilter(
      this.item,
      filter,
      filterIndex
    )

    this.group = new ListGroup()
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
    filter?: Ref<string>,
    filterIndex?: Ref<string[]>,
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
        filter,
        filterIndex,
        sort,
        desc,
        addText
      )
    }
  }
}
