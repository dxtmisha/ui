import { AssociativeType, ComponentBaseType, GeoDateType } from '../types'
import { ComputedRef, Ref } from 'vue'

export type MaskItemType = {
  index: string
  value: string
  maxLength: number
  full: boolean
  chars: string[]
}
export type MaskItemsType = AssociativeType<MaskItemType>

export type MaskPatternFunctionType = (data: MaskItemsType) => string | AssociativeType<string>
export type MaskPatternTypeType = AssociativeType<string> | string | MaskPatternFunctionType
export type MaskPatternType = AssociativeType<MaskPatternTypeType>

export type MaskSpecialItemType = {
  rubber?: boolean
  transitionChar?: string
  maxLength?: number
  minLength?: number
}
export type MaskSpecialType = string | string[] | AssociativeType<MaskSpecialItemType>

export type MaskTypeType = GeoDateType | 'text' | 'number' | 'currency' | 'phone'

export type MaskValidationType = {
  index: string
  status: boolean
  input: HTMLInputElement
  validationMessage: string
  validity: ValidityState,
  pattern: MaskPatternTypeType
}

export type MaskSetupType = ComponentBaseType & {
  charsElement: Ref<HTMLSpanElement | undefined>
  dateElement: Ref<HTMLInputElement | undefined>
  standard: ComputedRef<string>
  validation: ComputedRef<MaskValidationType | undefined>
  validationMessage: ComputedRef<string>
  maskBind: ComputedRef<string[]>
  valueBind: ComputedRef<string>
  onBlur: (event: FocusEvent) => void
  onChange: (event: Event) => void
  onFocus: (event: FocusEvent) => void
  onInput: (event: InputEvent) => void
  onKeydown: (event: KeyboardEvent) => void
  onKeypress: (event: KeyboardEvent) => void
  onPaste: (event: ClipboardEvent) => void
}
