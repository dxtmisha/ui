import { ComputedRef, Ref } from 'vue'
import {
  AssociativeType,
  BooleanOrNumberOrStringType,
  ComponentAssociativeType,
  ComponentBaseType
} from '../types'

export type CheckboxClassesType = {
  main: ComponentAssociativeType
  input: ComponentAssociativeType
  item: ComponentAssociativeType
  required: ComponentAssociativeType
  text: ComponentAssociativeType
}

export type CheckboxSetupType = ComponentBaseType & {
  classes: ComputedRef<CheckboxClassesType>
  type: string
  inputBind: ComputedRef<AssociativeType>
  validationMessageBind: ComputedRef<string>
  valueBind: Ref<BooleanOrNumberOrStringType>
  valueOriginalBind: ComputedRef<string>
  checkValidity: () => boolean
  onChecked: (event: Event) => void
}
