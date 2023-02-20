import { computed, ComputedRef } from 'vue'
import { ButtonComponentItemAbstract } from './ButtonComponentItemAbstract'
import { UseEnabled } from '../Use/UseEnabled'
import { UseIcon } from '../Use/UseIcon'
import { props } from './props'

import { AssociativeType } from '../types'
import { ButtonClassesType, ButtonSetupType } from './types'
import { ButtonValue } from './ButtonValue'

export abstract class ButtonComponentAbstract extends ButtonComponentItemAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = ['height', 'width'] as string[]

  private readonly valueItem: ButtonValue
  private readonly iconItem: UseIcon
  private readonly enabled: UseEnabled

  protected abstract appearanceInverse: string[]

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.valueItem = new ButtonValue(
      this.refs?.value,
      this.refs?.detail
    )
    this.iconItem = new UseIcon(
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

      valueBind: this.valueItem.item,

      // DELETE
      disabledBind: this.disabled,

      progressBind: this.progress,
      onClick: (event: MouseEvent) => this.onClick(event),

      ...this.iconItem.getSetup()
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
