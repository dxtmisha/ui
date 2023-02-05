import { ComputedRef, Ref } from 'vue'
import {
  AssociativeType,
  BooleanOrNumberOrStringType,
  ComponentAssociativeType,
  ComponentBaseType
} from '../types'

export type CheckboxClassesType = {
  main: ComponentAssociativeType
  icon: ComponentAssociativeType
  input: ComponentAssociativeType
  item: ComponentAssociativeType
  required: ComponentAssociativeType
  right: ComponentAssociativeType
  text: ComponentAssociativeType
}

export type CheckboxSetupType = ComponentBaseType & {
  classes: ComputedRef<CheckboxClassesType>
  type: string
  isRipple: ComputedRef<boolean>
  isText: ComputedRef<boolean>
  iconBind: ComputedRef<AssociativeType>
  inputBind: ComputedRef<AssociativeType>
  validationMessageBind: ComputedRef<string>
  valueBind: Ref<BooleanOrNumberOrStringType>
  valueOriginalBind: ComputedRef<string>
  messageBind: ComputedRef<AssociativeType>
  checkValidity: () => boolean
  onChecked: (event: Event) => void
}
