import { computed, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { getIdElement, isFilled } from '../../functions'
import { props } from './props'

import { AssociativeType } from '../types'
import { FieldClassesType, FieldSetupType } from './types'
import { FieldValue } from './FieldValue'
import { UseEnabled } from '../Use/UseEnabled'
import { FieldCancel } from './FieldCancel'
import { FieldAlign } from './FieldAlign'
import { FieldArrow } from './FieldArrow'
import { FieldIcon } from './FieldIcon'
import { FieldPrefix } from './FieldPrefix'
import { FieldMessageProps } from '../FieldMessage/FieldMessageProps'

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
  private readonly icon: FieldIcon
  private readonly enabled: UseEnabled

  private readonly arrow: FieldArrow
  private readonly cancel: FieldCancel

  private readonly align: FieldAlign
  private readonly prefix: FieldPrefix

  private readonly message: FieldMessageProps

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context)

    this.id = `field--id--${getIdElement()}`
    this.value = new FieldValue(this.refs.value)
    this.icon = new FieldIcon(
      this.getBind,
      this.refs.icon,
      this.refs.iconTrailing,
      this.refs.iconCancel,
      this.refs.iconPrevious,
      this.refs.iconNext,
      this.refs.selected,
      this.refs.disabled,
      this.refs.disabledPrevious,
      this.refs.disabledNext
    )
    this.enabled = new UseEnabled(
      this.refs.disabled,
      this.refs.readonly
    )

    this.arrow = new FieldArrow(
      this.refs.arrow,
      this.refs.align
    )
    this.cancel = new FieldCancel(
      this.value,
      this.enabled,
      this.arrow,
      this.refs.cancel
    )

    this.align = new FieldAlign(
      this.context.slots,
      this.arrow,
      this.cancel,
      this.refs.icon,
      this.refs.iconTrailing
    )
    this.prefix = new FieldPrefix(
      this.context.slots,
      this.refs.prefix,
      this.refs.suffix
    )

    this.message = new FieldMessageProps(
      this.props,
      { validationMessage: this.validationText }
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
        ...this.value.getClass(),
        ...this.arrow.getClass(),
        ...this.cancel.getClass(),
        ...this.prefix.getClass(),
        'is-validation': this.isValidation
      }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      id: this.id,
      isRequired: this.isRequired,
      isRipple: this.isRipple,
      isCancel: this.cancel.item,

      isValidation: this.isValidation,
      validationText: this.validationText,
      messageBind: this.message.get(),

      update: this.update,
      onClick: (event: MouseEvent) => this.onClick(event),

      ...this.icon.getFieldSetup(),
      ...this.align.getSetup(),
      ...this.prefix.getSetup()
    }
  }

  protected readonly isRequired = computed<boolean>(() => this.props.required && this.enabled.is())
  protected readonly isRipple = computed<boolean>(() => this.props.ripple && this.enabled.is())

  protected readonly isValidation = computed<boolean>(() => isFilled(this.props.validationMessage))
  protected readonly validationText = computed<string>(
    () => typeof this.props.validationMessage === 'string' ? this.props.validationMessage : ''
  )

  protected update () {
    requestAnimationFrame(() => {
      this.align.update()
      this.prefix.update()
    })
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
