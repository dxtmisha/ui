import { AssociativeType } from '../types'
import { MaskPatternTypeType } from '../Mask/types'

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
