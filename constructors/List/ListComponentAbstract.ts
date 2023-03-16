import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { List } from './List'
import { ListStatus } from './ListStatus'
import { ListType } from './ListType'

import { AssociativeType } from '../types'
import { ListClassesType, ListSetupType } from './types'

export abstract class ListComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = [] as string[]

  protected readonly exclusionForItem = [
    'list',
    'rename',
    'filter',
    'filterIndex',
    'sort',
    'desc',
    'focus',
    'highlight',
    'selected'
  ] as string[]

  protected readonly exclusionForList = ['icon', 'list'] as string[]

  protected readonly list: List
  protected readonly listByType: ListType
  protected readonly listByStatus: ListStatus

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.list = new List(
      this.refs.list,
      this.refs.rename,
      this.refs.selected,
      this.refs.filter,
      this.refs.filterIndex,
      this.refs.sort,
      this.refs.desc
    )
    this.listByType = new ListType(
      this.list,
      this.props,
      this.exclusionForItem,
      this.exclusionForList
    )
    this.listByStatus = new ListStatus(
      this.listByType,
      this.refs.focus,
      this.refs.highlight,
      this.refs.selected
    )

    console.log('this.list', this.listByType.get())
  }

  setup (): ListSetupType {
    const classes = this.getClasses<ListClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,

      listBind: this.listByStatus.item
    }
  }
}
