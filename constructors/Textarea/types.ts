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

  isValue: ComputedRef<boolean>,
  valueBind: Ref<BooleanOrNumberOrStringType>
  valueOriginalBind: ComputedRef<string>
  counterBind: ComputedRef<NumberOrUndefinedType>

  validationMessageBind: ComputedRef<string>
  checkValidity: () => boolean

  onBlur: () => void
  onInput: (event: Event) => void
  onChange: () => void
}
