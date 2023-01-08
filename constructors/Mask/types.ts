import { AssociativeType, ComponentBaseType } from '../types'
import { ComputedRef, Ref } from 'vue'

export type MaskItemType = {
  index: string
  maxLength: number
  full: boolean
  chars: string[]
  value: string
}
export type MaskItemsType = AssociativeType<MaskItemType>

export type MaskPatternFunctionType = (data: MaskItemsType) => string
export type MaskPatternItemType = {
  pattern: string | MaskPatternFunctionType
  attributes?: AssociativeType
  rubber?: boolean
  transitionChar?: string
  maxLength?: number
  minLength?: number
}
export type MaskPatternTypeType = MaskPatternItemType | string | MaskPatternFunctionType
export type MaskPatternType = AssociativeType<MaskPatternTypeType>

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
  valueBind: ComputedRef<string>
  onBlur: (event: FocusEvent) => void
  onChange: (event: Event) => void
  onFocus: (event: FocusEvent) => void
  onInput: (event: InputEvent) => void
  onKeydown: (event: KeyboardEvent) => void
  onKeypress: (event: KeyboardEvent) => void
  onPaste: (event: ClipboardEvent) => void
}
