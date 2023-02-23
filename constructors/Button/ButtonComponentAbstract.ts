import { computed } from 'vue'
import { ButtonEvent } from './ButtonEvent'
import { ButtonValue } from './ButtonValue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { UseEnabled } from '../Use/UseEnabled'
import { UseIcon } from '../Use/UseIcon'
import { UseInverse } from '../Use/UseInverse'
import { UseProgress } from '../Progress/UseProgress'
import { props } from './props'

import { AssociativeType } from '../types'
import { ButtonClassesType, ButtonSetupType } from './types'

export abstract class ButtonComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = ['height', 'width'] as string[]

  private readonly value: ButtonValue
  private readonly enabled: UseEnabled

  private readonly icon: UseIcon

  private readonly inverse: UseInverse
  private readonly progress: UseProgress

  private readonly event: ButtonEvent

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object,
    appearanceInverse = [] as string[]
  ) {
    super(props, context)

    this.value = new ButtonValue(
      this.refs?.value,
      this.refs?.detail
    )
    this.enabled = new UseEnabled(
      this.refs?.disabled,
      this.refs?.readonly,
      this.refs?.progress,
      this.refs?.ripple
    )

    this.icon = new UseIcon(
      this.getBind,
      this.refs?.icon,
      this.refs?.iconTrailing,
      this.refs?.selected,
      this.refs?.disabled,
      this.refs?.turn,
      this.refs?.hide,
      true,
      this.isText
    )

    this.inverse = new UseInverse(appearanceInverse, this.refs?.appearance)
    this.progress = new UseProgress('circular', this.inverse)

    this.event = new ButtonEvent(
      this.context.emit,
      this.value,
      this.enabled,
      this.refs?.to
    )
  }

  setup (): ButtonSetupType {
    const classes = this.getClasses<ButtonClassesType>({
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

      isText: this.isText,
      isRipple: this.enabled.itemRipple,
      isInverse: this.inverse.item,

      valueBind: this.value.item,
      progressBind: this.progress.item,
      disabledBind: this.enabled.itemDisabled,

      onClick: (event: MouseEvent) => this.event.onClick(event),

      ...this.icon.getSetup()
    }
  }

  private readonly isText = computed<boolean>(() => this.props.text || 'default' in this.context.slots)
}
