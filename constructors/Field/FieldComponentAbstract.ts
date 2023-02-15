import { computed, ref, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { getIdElement, isFilled } from '../../functions'
import { props } from './props'

import { AssociativeType } from '../types'
import { FieldClassesType, FieldSetupType } from './types'
import { FieldValue } from './FieldValue'
import { UseEnabled } from '../Use/UseEnabled'
import { FieldCancel } from './FieldCancel'
import { FieldAlign } from './FieldAlign'

export abstract class FieldComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-previous',
    'on-next',
    'on-cancel',
    'on-trailing'
  ] as string[]

  private readonly id: string
  private readonly value: FieldValue
  private readonly enabled: UseEnabled

  private readonly cancel: FieldCancel
  private readonly align: FieldAlign

  protected readonly prefixElement = ref<HTMLElement | undefined>()
  protected readonly suffixElement = ref<HTMLElement | undefined>()
  protected readonly prefixWidth = ref<string>('0px')
  protected readonly suffixWidth = ref<string>('0px')

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.id = `field--id--${getIdElement()}`
    this.value = new FieldValue(this.refs.value)
    this.enabled = new UseEnabled(
      this.refs.disabled,
      this.refs.readonly
    )

    this.cancel = new FieldCancel(
      this.value,
      this.enabled,
      this.refs.cancel,
      this.refs.arrow
    )
    this.align = new FieldAlign(
      this.context.slots,
      this.cancel,
      this.refs.icon,
      this.refs.iconTrailing,
      this.refs.align,
      this.refs.arrow
    )

    watch([
      this.refs.icon,
      this.refs.iconTrailing,
      this.refs.arrow,
      this.refs.prefix,
      this.refs.suffix,
      this.cancel.item
    ], () => this.update())

    this.update()
  }

  setup (): FieldSetupType {
    const classes = this.getClasses<FieldClassesType>({
      main: {
        'is-arrow': this.refs.arrow,
        'is-cancel': this.cancel.item,
        'is-suffix': this.isSuffix,
        'is-validation': this.isValidation,
        'is-value': this.value.item
      }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      id: this.id,
      prefixElement: this.prefixElement,
      suffixElement: this.suffixElement,
      isRequired: this.isRequired,
      isRipple: this.isRipple,
      isPrefix: this.isPrefix,
      isSuffix: this.isSuffix,
      isCancel: this.cancel.item,
      isValidation: this.isValidation,
      iconBind: this.getBind(this.refs.icon, this.icon, 'icon'),
      iconTrailingBind: this.getBind(this.refs.iconTrailing, this.iconTrailing, 'icon'),
      iconCancelBind: this.getBind(this.refs.iconCancel, this.iconCancel, 'icon'),
      iconPreviousBind: this.getBind(this.refs.iconPrevious, this.iconPrevious, 'icon'),
      iconNextBind: this.getBind(this.refs.iconNext, this.iconNext, 'icon'),
      messageBind: this.message,
      prefixWidth: this.prefixWidth,
      suffixWidth: this.suffixWidth,
      validationText: this.validationText,
      update: this.update,
      onClick: (event: MouseEvent) => this.onClick(event),

      ...this.align.getSetup()
    }
  }

  protected readonly isRequired = computed<boolean>(() => this.props.required && this.enabled.is())
  protected readonly isRipple = computed<boolean>(() => this.props.ripple && this.enabled.is())

  protected readonly isPrefix = computed<boolean>(() => isFilled(this.props.prefix) || 'prefix' in this.context.slots)
  protected readonly isSuffix = computed<boolean>(() => isFilled(this.props.suffix) || 'suffix' in this.context.slots)
  protected readonly isValidation = computed<boolean>(() => isFilled(this.props.validationMessage))

  readonly icon = computed(() => {
    return {
      active: this.props.selected,
      disabled: this.props.disabled
    }
  })

  readonly iconTrailing = computed(() => {
    return {
      class: 'is-icon is-trailing',
      disabled: this.props.disabled,
      turn: this.props.turn
    }
  })

  readonly iconCancel = computed(() => {
    return {
      class: 'is-icon is-cancel'
    }
  })

  readonly iconPrevious = computed(() => {
    return {
      class: 'is-icon is-previous',
      background: true,
      disabled: this.props.disabled || this.props.disabledPrevious
    }
  })

  readonly iconNext = computed(() => {
    return {
      class: 'is-icon is-next',
      background: true,
      disabled: this.props.disabled || this.props.disabledNext
    }
  })

  readonly message = computed<AssociativeType>(() => {
    return {
      counter: this.props.counter,
      disabled: this.props.disabled,
      helperMessage: this.props.helperMessage,
      maxlength: this.props.maxlength,
      validationMessage: this.validationText.value
    }
  })

  readonly validationText = computed<string>(() => {
    return typeof this.props.validationMessage === 'string' ? this.props.validationMessage : ''
  })

  protected update () {
    requestAnimationFrame(() => {
      this.align.update()
      this.updatePrefix()
      this.updateSuffix()
    })
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

    if (inputElement && this.enabled.is()) {
      if ((event.target as HTMLElement)?.closest('.is-icon.is-previous')) {
        if (!this.props.disabledPrevious) {
          this.context.emit('on-previous', this.props.detail)
        }
      } else if ((event.target as HTMLElement)?.closest('.is-icon.is-next')) {
        if (!this.props.disabledNext) {
          this.context.emit('on-next', this.props.detail)
        }
      } else if ((event.target as HTMLElement)?.closest('.is-icon.is-trailing')) {
        this.context.emit('on-trailing', this.props.detail)
        inputElement.focus()
      } else if ((event.target as HTMLElement)?.closest('.is-icon.is-cancel')) {
        this.context.emit('on-cancel', this.props.detail)
        inputElement.focus()
      } else {
        inputElement.focus()
      }
    }
  }
}
