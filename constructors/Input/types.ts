import { AssociativeType, ComponentAssociativeType, ComponentBaseType, NumberOrStringType } from '../types'
import { ComputedRef, Ref } from 'vue'

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
  validationMessageBind: ComputedRef<string>
  valueBind: Ref<NumberOrStringType>
  onChange: (event?: Event) => void
}
