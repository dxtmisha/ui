import { AssociativeType, ComponentBaseType } from '../types'
import { ComputedRef, Ref } from 'vue'

export type MaskItemType = {
  index: string
  maxLength: number
  full: boolean
  chars: string[]
  value: string
}

export type MaskPatternFunctionType = (data: AssociativeType<string>) => string
export type MaskPatternItemType = {
  pattern: string | MaskPatternFunctionType
  rubber: boolean
  transitionChar: string
  maxLength?: number
  minLength?: number
}

export type MaskPatternType =
  string
  | MaskPatternFunctionType
  | AssociativeType<MaskPatternItemType | string | MaskPatternFunctionType>

export type MaskItemsType = AssociativeType<MaskItemType>

export type MaskSetupType = ComponentBaseType & {
  charsElement: Ref<HTMLSpanElement | undefined>
  dateElement: Ref<HTMLInputElement | undefined>
  standard: ComputedRef<string>
  valueBind: ComputedRef<string>
  onBlur: (event: FocusEvent) => void
  onChange: (event: Event) => void
  onFocus: (event: FocusEvent) => void
  onInput: (event: InputEvent) => void
  onKeydown: (event: KeyboardEvent) => void
  onKeypress: (event: KeyboardEvent) => void
  onPaste: (event: ClipboardEvent) => void
}
