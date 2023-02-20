import { computed, ComputedRef } from 'vue'
import { ButtonComponentItemAbstract } from './ButtonComponentItemAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType,
  EventCallbackRequiredType
} from '../types'
import { UseEnabled } from '../Use/UseEnabled'
import { UseIcon } from '../Use/UseIcon'

export type ButtonClassesType = {
  main: ComponentAssociativeType
  text: ComponentAssociativeType
}
export type ButtonSetupType = ComponentBaseType & {
  classes: ComputedRef<ButtonClassesType>
  isInverse: ComputedRef<boolean>
  isRipple: ComputedRef<boolean>
  isText: ComputedRef<boolean>
  disabledBind: ComputedRef<boolean | undefined>
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind: ComputedRef<string | AssociativeType>
  progressBind: ComputedRef<AssociativeType>
  valueBind: ComputedRef
  onClick: EventCallbackRequiredType<void, MouseEvent>
}

export abstract class ButtonComponentAbstract extends ButtonComponentItemAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = ['height', 'width'] as string[]

  private readonly icon: UseIcon
  private readonly enabled: UseEnabled

  protected abstract appearanceInverse: string[]

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

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

      // DELETE
      disabledBind: this.disabled,
      iconBind: this.getBind(this.refs.icon, this.icon, 'icon'),
      iconTrailingBind: this.getBind(this.refs.iconTrailing, this.iconTrailing, 'icon'),
      progressBind: this.progress,
      valueBind: this.value,
      onClick: (event: MouseEvent) => this.onClick(event)
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
