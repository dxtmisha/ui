import { computed, ComputedRef, Ref, ref, watchEffect } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType
} from '../types'
import { getIdElement, isFilled } from '../../functions'

export type FieldClassesType = {
  main: ComponentAssociativeType
  body: ComponentAssociativeType
  input: ComponentAssociativeType
  hidden: ComponentAssociativeType
  label: ComponentAssociativeType
  title: ComponentAssociativeType
  text: ComponentAssociativeType
  required: ComponentAssociativeType
  scoreboard: ComponentAssociativeType
  scoreboardContext: ComponentAssociativeType
  scoreboardSpace: ComponentAssociativeType
  prefix: ComponentAssociativeType
  suffix: ComponentAssociativeType
  border: ComponentAssociativeType
}
export type FieldSetupType = ComponentBaseType & {
  classes: ComputedRef<FieldClassesType>
  id: string
  leftElement: Ref<HTMLElement | undefined>
  rightElement: Ref<HTMLElement | undefined>
  prefixElement: Ref<HTMLElement | undefined>
  suffixElement: Ref<HTMLElement | undefined>
  ifRipple: ComputedRef<boolean>
  ifPrefix: ComputedRef<boolean>
  ifSuffix: ComputedRef<boolean>
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind: ComputedRef<string | AssociativeType>
  iconPreviousBind: ComputedRef<string | AssociativeType>
  iconNextBind: ComputedRef<string | AssociativeType>
  left: Ref<string>
  right: Ref<string>
  prefixWidth: Ref<string>
  suffixWidth: Ref<string>
  update: () => void
  onClick: (event: MouseEvent) => void
}

export abstract class FieldComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-previous',
    'on-next',
    'on-cancel',
    'on-trailing'
  ] as string[]

  protected readonly id: string
  protected readonly leftElement = ref<HTMLElement | undefined>()
  protected readonly rightElement = ref<HTMLElement | undefined>()
  protected readonly prefixElement = ref<HTMLElement | undefined>()
  protected readonly suffixElement = ref<HTMLElement | undefined>()
  protected readonly left = ref<string>('0px')
  protected readonly right = ref<string>('0px')
  protected readonly prefixWidth = ref<string>('0px')
  protected readonly suffixWidth = ref<string>('0px')

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.id = `field--id--${getIdElement()}`

    watchEffect(() => this.update())
  }

  setup (): FieldSetupType {
    const classes = this.getClasses<FieldClassesType>({
      main: {
        'is-arrow': this.refs.arrow,
        'is-value': this.ifValue
      }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      id: this.id,
      leftElement: this.leftElement,
      rightElement: this.rightElement,
      prefixElement: this.prefixElement,
      suffixElement: this.suffixElement,
      ifRipple: this.ifRipple,
      ifPrefix: this.ifPrefix,
      ifSuffix: this.ifSuffix,
      iconBind: this.getBind(this.refs.icon, this.icon, 'icon'),
      iconTrailingBind: this.getBind(this.refs.iconTrailing, this.iconTrailing, 'icon'),
      iconPreviousBind: this.getBind(this.refs.iconPrevious, this.iconPrevious, 'icon'),
      iconNextBind: this.getBind(this.refs.iconNext, this.iconNext, 'icon'),
      left: this.left,
      right: this.right,
      prefixWidth: this.prefixWidth,
      suffixWidth: this.suffixWidth,
      update: this.update,
      onClick: (event: MouseEvent) => this.onClick(event)
    }
  }

  protected readonly ifRipple = computed(() => this.props.ripple && !this.props.disabled) as ComputedRef<boolean>
  protected readonly ifPrefix = computed<boolean>(() => isFilled(this.props.prefix) || 'prefix' in this.context.slots)
  protected readonly ifSuffix = computed<boolean>(() => isFilled(this.props.suffix) || 'suffix' in this.context.slots)
  protected readonly ifValue = computed<boolean>(() => isFilled(this.props.value))

  readonly icon = computed(() => {
    return {
      active: this.props.selected,
      disabled: this.props.disabled
    }
  })

  readonly iconTrailing = computed(() => {
    return {
      class: 'is-trailing',
      disabled: this.props.disabled,
      turn: this.props.turn
    }
  })

  readonly iconPrevious = computed(() => {
    return {
      class: 'is-previous',
      background: true,
      disabled: this.props.disabled || this.props.disabledPrevious
    }
  })

  readonly iconNext = computed(() => {
    return {
      class: 'is-next',
      background: true,
      disabled: this.props.disabled || this.props.disabledNext
    }
  })

  protected update () {
    requestAnimationFrame(() => {
      this.updateLeft()
      this.updateRight()
      this.updatePrefix()
      this.updateSuffix()
    })
  }

  protected updateLeft () {
    if (
      this.props.icon ||
      this.props.arrow
    ) {
      this.left.value = `${this.leftElement.value?.offsetWidth}px`
    } else {
      this.left.value = '0px'
    }
  }

  protected updateRight () {
    if (
      this.props.icon ||
      this.props.arrow
    ) {
      this.right.value = `${this.rightElement.value?.offsetWidth}px`
    } else {
      this.right.value = '0px'
    }
  }

  protected updatePrefix () {
    if (this.prefixElement.value) {
      this.prefixWidth.value = `${this.prefixElement.value.offsetWidth}px`
    } else {
      this.prefixWidth.value = '0px'
    }
  }

  protected updateSuffix () {
    if (this.suffixElement.value) {
      this.suffixWidth.value = `${this.suffixElement.value.offsetWidth}px`
    } else {
      this.suffixWidth.value = '0px'
    }
  }

  protected onClick<T = MouseEvent> (event: Event & T) {
    const inputElement = this.element.value?.querySelector<HTMLInputElement>(`.${this.getItem().getClassName(['input'])}`)

    if (
      inputElement &&
      !this.props.disabled
    ) {
      if (
        !this.props.disabledPrevious &&
        (event.target as HTMLElement)?.closest('.is-previous')
      ) {
        this.context.emit('on-previous', this.props.detail)
      } else if (
        !this.props.disabledNext &&
        (event.target as HTMLElement)?.closest('.is-next')
      ) {
        this.context.emit('on-next', this.props.detail)
      } else if (
        (event.target as HTMLElement)?.closest('.is-trailing')
      ) {
        this.context.emit('on-trailing', this.props.detail)
        inputElement.focus()
      } else {
        inputElement.focus()
      }
    }
  }
}
