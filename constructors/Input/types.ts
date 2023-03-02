import { ComputedRef, Ref } from 'vue'
import {
  AssociativeType,
  BooleanOrNumberOrStringType,
  ComponentBaseType,
  NumberOrUndefinedType
} from '../types'

export type InputMatchItemType = {
  name: string
  text: string
}
export type InputMatchType = string | InputMatchItemType

export type InputTypeType =
  'date' |
  'datetime' |
  'email' |
  'month' |
  'number' |
  'password' |
  'search' |
  'second' |
  'tel' |
  'text' |
  'time' |
  'url'

export type InputValidationType = {
  checkValidity: boolean
  input?: HTMLInputElement
  validationMessage: string
  validity?: ValidityState
}

export type InputValidityType = AssociativeType & {
  badInput?: string
  customError?: string
  patternMismatch?: string
  rangeOverflow?: string
  rangeUnderflow?: string
  stepMismatch?: string
  tooLong?: string
  tooShort?: string
  typeMismatch?: string
  valid?: string
  valueMissing?: string
}

export type InputSetupType = ComponentBaseType & {
  fieldBind: ComputedRef<AssociativeType>
  iconTrailingBind: ComputedRef<AssociativeType | string | undefined>
  inputBind: ComputedRef<AssociativeType>
  maskBind: ComputedRef<AssociativeType | undefined>
  counterBind: ComputedRef<NumberOrUndefinedType>

  isValue: Ref<boolean>
  valueBind: Ref<BooleanOrNumberOrStringType>
  valueOriginalBind: ComputedRef<string>

  validationMessageBind: ComputedRef<string>

  disabledNext: ComputedRef<boolean>
  disabledPrevious: ComputedRef<boolean>

  checkValidity: () => boolean
  onBlur: () => void
  onKeypress: (event: KeyboardEvent) => void
  onPaste: (event: ClipboardEvent) => void

  onInput: (event: Event) => void
  onChange: () => void
  onNext: () => void
  onPrevious: () => void

  onCancel: () => void
  onTrailing: () => void
}
