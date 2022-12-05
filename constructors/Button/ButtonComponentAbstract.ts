import { computed, ComputedRef } from 'vue'
import { useRouter } from 'vue-router'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType,
  EventCallbackRequiredType
} from '../types'

export type ButtonClassesType = {
  main: ComponentAssociativeType
  text: ComponentAssociativeType
}
export type ButtonSetupType = ComponentBaseType & {
  classes: ComputedRef<ButtonClassesType>
  ifInverse: ComputedRef<boolean>
  ifRipple: ComputedRef<boolean>
  ifText: ComputedRef<boolean>
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind: ComputedRef<string | AssociativeType>
  progressBind: ComputedRef<AssociativeType>
  valueBind: ComputedRef
  onClick: EventCallbackRequiredType<void, MouseEvent>
}

export abstract class ButtonComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-click', 'on-trailing'] as string[]

  protected readonly stylesProps = ['width'] as string[]

  protected abstract appearanceInverse: string[]

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
      ifInverse: this.ifInverse,
      ifRipple: this.ifRipple,
      ifText: this.ifText,
      iconBind: this.getBind(this.refs.icon, this.icon, 'icon'),
      iconTrailingBind: this.getBind(this.refs.iconTrailing, this.iconTrailing, 'icon'),
      progressBind: this.progress,
      valueBind: this.value,
      onClick: (event: MouseEvent) => this.onClick(event)
    }
  }

  readonly ifInverse = computed(() => {
    return this.appearanceInverse.indexOf(this.props.appearance) !== -1 ||
      this.appearanceInverse.indexOf('all') !== -1
  }) as ComputedRef<boolean>

  readonly ifRipple = computed(() => this.props.ripple &&
    !this.props.disabled &&
    !this.props.readonly
  ) as ComputedRef<boolean>

  readonly ifText = computed(() => this.props.text || 'default' in this.context.slots) as ComputedRef<boolean>

  readonly isIcon = computed(() => (this.refs.icon || this.refs.iconTrailing) && !this.ifText.value) as ComputedRef<boolean>

  readonly icon = computed(() => {
    return {
      disabled: this.props.disabled
    }
  })

  readonly iconTrailing = computed(() => {
    return {
      class: 'is-trailing',
      disabled: this.props.disabled,
      inEnd: true,
      turn: this.props.turn
    }
  })

  readonly progress = computed(() => {
    return {
      inverse: this.ifInverse.value,
      type: 'circular',
      visible: true
    }
  })

  readonly value = computed(() => this.props.value || this.props.detail?.value)

  onClick (event: MouseEvent): void {
    let type = 'on-click'

    if (
      this.props.readonly ||
      this.props.disabled ||
      this.props.progress
    ) {
      event.preventDefault()
      event.stopPropagation()
    } else {
      if (
        (event.target as HTMLElement)?.closest('.is-trailing')
      ) {
        event.preventDefault()
        event.stopPropagation()
        type = 'on-trailing'
      } else if (this.props.to) {
        this.toRouter().then()
        return
      }

      this.context.emit(type, {
        type,
        detail: this.props.detail,
        value: this.value.value
      })
    }
  }

  protected toRouter () {
    const router = useRouter()
    return router.push(this.props.to)
  }
}
