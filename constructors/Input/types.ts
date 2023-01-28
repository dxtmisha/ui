import { ComputedRef, Ref } from 'vue'
import {
  AssociativeType,
  BooleanOrNumberOrStringType,
  ComponentAssociativeType,
  ComponentBaseType, NumberOrUndefinedType
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
  'tel' |
  'text' |
  'time' |
  'url'

export type InputValidationType = {
  status: boolean
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

export type InputClassesType = {
  main: ComponentAssociativeType
}

export type InputSetupType = ComponentBaseType & {
  fieldBind: ComputedRef<AssociativeType>
  inputBind: ComputedRef<AssociativeType>
  counterBind: ComputedRef<NumberOrUndefinedType>
  validationMessageBind: ComputedRef<string>
  valueBind: Ref<BooleanOrNumberOrStringType>
  disabledPrevious: ComputedRef<boolean>
  disabledNext: ComputedRef<boolean>
  onBlur: () => void
  onKeypress: (event: KeyboardEvent) => void
  onPaste: (event: ClipboardEvent) => void
  onChange: () => void
  onInput: (event: Event) => void
  onPrevious: () => void
  onNext: () => void
  onCancel: () => void
}
