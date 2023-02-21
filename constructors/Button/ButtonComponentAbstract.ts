import { computed, ComputedRef } from 'vue'
import { UseEnabled } from '../Use/UseEnabled'
import { UseIcon } from '../Use/UseIcon'
import { props } from './props'

import { AssociativeType } from '../types'
import { ButtonClassesType, ButtonSetupType } from './types'
import { ButtonValue } from './ButtonValue'
import { ButtonEvent } from './ButtonEvent'
import { ComponentAbstract } from '../../classes/ComponentAbstract'

export abstract class ButtonComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = ['height', 'width'] as string[]

  private readonly value: ButtonValue
  private readonly icon: UseIcon
  private readonly enabled: UseEnabled

  private readonly event: ButtonEvent

  protected abstract appearanceInverse: string[]

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.value = new ButtonValue(
      this.refs?.value,
      this.refs?.detail
    )
    this.icon = new UseIcon(
      this.getBind,
      this.refs?.icon,
      this.refs?.iconTrailing,
      this.refs?.selected,
      this.refs?.disabled,
      this.refs?.turn
    )
    this.enabled = new UseEnabled(
      this.refs?.disabled,
      this.refs?.readonly,
      this.refs?.progress,
      this.refs?.ripple
    )

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
        'is-icon': this.isIcon
      }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      isInverse: this.isInverse,
      isRipple: this.enabled.itemRipple,
      isText: this.isText,

      valueBind: this.value.item,
      progressBind: this.progress,
      disabledBind: this.enabled.itemDisabled,

      onClick: (event: MouseEvent) => this.event.onClick(event),

      ...this.icon.getSetup()
    }
  }

  readonly isIcon = computed(() => (this.refs.icon || this.refs.iconTrailing) && !this.isText.value) as ComputedRef<boolean>

  readonly isInverse = computed(() => {
    return this.appearanceInverse.indexOf(this.props.appearance) !== -1 ||
      this.appearanceInverse.indexOf('all') !== -1
  }) as ComputedRef<boolean>

  readonly isText = computed(() => this.props.text || 'default' in this.context.slots) as ComputedRef<boolean>

  readonly disabled = computed(() => this.props.disabled || undefined) as ComputedRef<boolean | undefined>

  readonly progress = computed(() => {
    return {
      inverse: this.isInverse.value,
      type: 'circular',
      visible: true
    }
  })
}
