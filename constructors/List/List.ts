import { computed, isRef, Ref } from 'vue'
import { forEach } from '../../functions'

import { ListGroup } from './ListGroup'

import { AssociativeType, BooleanOrNumberOrStringType } from '../types'
import { ListDataType, ListItemType, ListValuesType, ListValueType } from './types'

export class List {
  private group: ListGroup

  constructor (
    private readonly values: ListValuesType,
    private readonly rename?: Ref<AssociativeType>,
    private readonly find?: Ref<BooleanOrNumberOrStringType>,
    private readonly findIndex?: Ref<string[]>,
    private readonly addText = true
  ) {
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
        this.find,
        this.findIndex,
        this.addText
      )
    }
  }

  static init (
    values: List | ListValuesType,
    rename?: Ref<AssociativeType>,
    find?: Ref<BooleanOrNumberOrStringType>,
    findIndex?: Ref<string[]>,
    addText = true
  ): List {
    if (values instanceof List) {
      return values
    } else {
      return new List(
        values,
        rename,
        find,
        findIndex,
        addText
      )
    }
  }
}
