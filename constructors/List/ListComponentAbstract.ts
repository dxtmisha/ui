import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { AssociativeType } from '../types'
import { ListClassesType, ListSetupType } from './types'
import { List } from './List'

export abstract class ListComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = [] as string[]

  protected readonly list: List

  // eslint-disable-next-line no-useless-constructor
  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.list = new List(
      this.refs.list,
      this.refs.rename,
      this.refs.value,
      this.refs.filter,
      this.refs.filterIndex,
      this.refs.sort,
      this.refs.desc
    )

    console.log('this.list', this.list.getList())
  }

  setup (): ListSetupType {
    const classes = this.getClasses<ListClassesType>()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,

      listBind: this.list.sortItem.item
    }
  }
}
