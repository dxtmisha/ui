import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'

import { ButtonEvent } from '../Button/ButtonEvent'
import { ListItemIcon } from './ListItemIcon'
import { ListItemText } from './ListItemText'
import { UseEnabled } from '../Use/UseEnabled'
import { UseInverseBySelected } from '../Use/UseInverseBySelected'
import { UseProgress } from '../Progress/UseProgress'
import { UseValue } from '../Use/UseValue'

import { AssociativeType } from '../types'
import { ListItemClassesType, ListItemSetupType } from './types'

export abstract class ListItemComponentAbstract extends ComponentAbstract<HTMLSpanElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = [
    'palette',
    'overlay',
    'rounded',
    'height'
  ] as string[]

  private readonly value: UseValue
  private readonly enabled: UseEnabled

  private readonly text: ListItemText
  private readonly icon: ListItemIcon

  private readonly inverse: UseInverseBySelected
  private readonly progress: UseProgress

  private readonly event: ButtonEvent

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object,
    appearanceInverse = [] as string[],
    selectedInverse = [] as string[]
  ) {
    super(props, context)

    this.value = new UseValue(
      this.refs?.value,
      this.refs?.detail
    )
    this.enabled = new UseEnabled(
      this.refs?.disabled,
      this.refs?.readonly,
      this.refs?.progress,
      this.refs?.ripple
    )

    this.text = new ListItemText(
      this.context.slots,
      this.refs?.text,
      this.refs?.textHighlight,
      this.refs?.prefix,
      this.refs?.suffix,
      this.refs?.description
    )

    this.icon = new ListItemIcon(
      this.getBind,
      this.refs?.icon,
      this.refs?.iconTrailing,
      this.refs?.thumbnail,
      this.refs?.height,
      this.refs?.selected,
      this.refs?.disabled,
      this.refs?.turn,
      this.text.isItem
    )

    this.inverse = new UseInverseBySelected(
      appearanceInverse,
      this.refs?.appearance,
      selectedInverse,
      this.refs?.selected
    )
    this.progress = new UseProgress('circular', this.inverse)

    this.event = new ButtonEvent(
      this.context.emit,
      this.value,
      this.enabled,
      this.refs?.to
    )
  }

  setup (): ListItemSetupType {
    const classes = this.getClasses<ListItemClassesType>({
      main: {
        'a-readonly': true,
        ...this.icon.getClass()
      }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,

      isRipple: this.enabled.itemRipple,
      isInverse: this.inverse.item,

      onClick: (event: MouseEvent) => this.event.onClick(event),

      ...this.value.getSetup(),
      ...this.text.getSetup(),
      ...this.icon.getSetupByThumbnail(),
      ...this.progress.getSetup()
    }
  }
}
