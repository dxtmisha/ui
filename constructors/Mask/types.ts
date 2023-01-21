import { AssociativeType, ComponentAssociativeType, ComponentBaseType, GeoDateType } from '../types'
import { ComputedRef, Ref } from 'vue'

export type MaskItemType = {
  index: string
  value: string
  maxLength: number
  full: boolean
  chars: string[]
}
export type MaskItemSpecialType = {
  index: number,
  key: number,
  char: string
}
export type MaskItemsType = AssociativeType<MaskItemType>

export type MaskPatternFunctionType = (data: MaskItemsType) => string | AssociativeType<string>
export type MaskPatternTypeType = AssociativeType<string> | string | MaskPatternFunctionType
export type MaskPatternType = AssociativeType<MaskPatternTypeType>

export type MaskSpecialItemType = {
  rubber?: boolean
  transitionChar?: string | string[]
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

export type MaskViewType = {
  type: string,
  value: string
}

export type MaskClassesType = {
  main: ComponentAssociativeType
  input: ComponentAssociativeType
  character: ComponentAssociativeType
}

export type MaskSetupType = ComponentBaseType & {
  classes: ComputedRef<MaskClassesType>
  charsElement: Ref<HTMLSpanElement | undefined>
  standard: ComputedRef<string>
  standardByRight: ComputedRef<string>
  validation: ComputedRef<MaskValidationType | undefined>
  validationMessage: ComputedRef<string>
  maskBind: ComputedRef<string[]>
  valueBind: ComputedRef<string>
  viewBind: ComputedRef<MaskViewType[]>
  onBlur: (event: FocusEvent) => void
  onChange: (event: Event) => void
  onClick: (event: MouseEvent) => void
  onFocus: (event: FocusEvent) => void
  onInput: (event: InputEvent) => void
  onKeydown: (event: KeyboardEvent) => void
  onKeypress: (event: KeyboardEvent) => void
  onPaste: (event: ClipboardEvent) => void
}
