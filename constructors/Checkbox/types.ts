import { ComputedRef, Ref } from 'vue'
import {
  AssociativeType,
  BooleanOrNumberOrStringType,
  ComponentBaseType
} from '../types'

export type CheckboxSetupType = ComponentBaseType & {
  inputBind: ComputedRef<AssociativeType>
  validationMessageBind: ComputedRef<string>
  valueBind: Ref<BooleanOrNumberOrStringType>
  valueOriginalBind: ComputedRef<string>
  checkValidity: () => boolean
  onChange: () => void
  onInput: (event: Event) => void
}
