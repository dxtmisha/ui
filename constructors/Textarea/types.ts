import { ComputedRef, Ref } from 'vue'
import {
  AssociativeType,
  BooleanOrNumberOrStringType,
  ComponentBaseType,
  NumberOrUndefinedType
} from '../types'

export type TextareaSetupType = ComponentBaseType & {
  fieldBind: ComputedRef<AssociativeType>
  inputBind: ComputedRef<AssociativeType>
  counterBind: ComputedRef<NumberOrUndefinedType>
  validationMessageBind: ComputedRef<string>
  valueBind: Ref<BooleanOrNumberOrStringType>
  valueOriginalBind: ComputedRef<string>
  checkValidity: () => boolean
  onBlur: () => void
  onChange: () => void
  onInput: (event: Event) => void
}
