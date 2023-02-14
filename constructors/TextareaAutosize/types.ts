import { ComputedRef, Ref } from 'vue'
import {
  BooleanOrNumberOrStringType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType
} from '../types'

export type TextareaAutosizeClassesType = ComponentClassesType & {
  clone: ComponentAssociativeType
}

export type TextareaAutosizeSetupType = ComponentBaseType & {
  classes: ComputedRef<TextareaAutosizeClassesType>
  cloneElement: Ref<HTMLDivElement | undefined>
  valueBind: Ref<BooleanOrNumberOrStringType>
  onBlur: () => void
  onChange: () => void
  onInput: (event: Event) => void
}
