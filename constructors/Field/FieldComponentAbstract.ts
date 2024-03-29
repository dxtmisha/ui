import { computed, watch } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { isFilled } from '../../functions/data'
import { getIdElement } from '../../functions/element'
import { props } from './props'

import { FieldAlign } from './FieldAlign'
import { FieldArrow } from './FieldArrow'
import { FieldIcon } from './FieldIcon'
import { FieldCancel } from './FieldCancel'
import { FieldPrefix } from './FieldPrefix'
import { FieldValue } from './FieldValue'
import { FieldMessageProps } from '../FieldMessage/FieldMessageProps'
import { UseEnabled } from '../Use/UseEnabled'

import { AssociativeType } from '../types'
import { FieldClassesType, FieldSetupType } from './types'

export abstract class FieldComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = [
    'on-previous',
    'on-next',
    'on-cancel',
    'on-trailing'
  ] as string[]

  protected readonly stylesProps = [
    'height',
    'rounded',
    'width'
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
    this.value = new FieldValue(this.getItem(), this.refs.value)
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
      this.refs.disabledNext,
      this.refs.turn
    )
    this.enabled = new UseEnabled(
      this.refs.disabled,
      this.refs.readonly,
      undefined,
      this.refs.ripple
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
        ...this.arrow.getClass(),
        ...this.cancel.getClass(),
        ...this.prefix.getClass(),
        ...this.value.getClass(),
        [this.getItem().getClassName([], ['validation'])]: this.isValidation
      }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      id: this.id,
      isEnabled: this.enabled.item,
      isRequired: this.isRequired,
      isRipple: this.enabled.itemRipple,
      isScoreboard: this.isScoreboard,
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

  private readonly isRequired = computed<boolean>(() => this.props.required && this.enabled.is())
  private readonly isScoreboard = computed<boolean>(() => this.align.is() || this.prefix.is())

  private readonly isValidation = computed<boolean>(() => isFilled(this.props.validationMessage))
  private readonly validationText = computed<string>(
    () => typeof this.props.validationMessage === 'string' ? this.props.validationMessage : ''
  )

  private update () {
    requestAnimationFrame(() => {
      this.align.update()
      this.prefix.update()
    })
  }

  private onClick<T = MouseEvent> (event: Event & T) {
    const inputElement = this.element.value?.querySelector<HTMLInputElement>(`.${this.getItem().getClassName(['input'])}`)

    if (inputElement && this.enabled.is()) {
      const type = this.getTypeByEvent(event)

      switch (type) {
        case 'disabled':
          return
        case 'on-trailing':
        case 'on-cancel':
        case undefined:
          inputElement.focus()
          break
      }

      if (type) {
        this.context.emit(type, this.props.detail)
      }
    }
  }

  private getTypeByEvent<T = MouseEvent> (event: Event & T): string | undefined {
    const target = event.target as HTMLElement

    if (target) {
      if (target.closest('.is-icon-item.is-trailing')) {
        return 'on-trailing'
      } else if (target.closest('.is-icon-item.is-cancel')) {
        return 'on-cancel'
      } else if (target.closest('.is-icon-item.is-previous')) {
        return this.props.disabledPrevious ? 'disabled' : 'on-previous'
      } else if (target.closest('.is-icon-item.is-next')) {
        return this.props.disabledNext ? 'disabled' : 'on-next'
      }
    }

    return undefined
  }
}
