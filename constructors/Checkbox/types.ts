import { ComputedRef, Ref } from 'vue'
import {
  AssociativeType,
  BooleanOrNumberOrStringType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType
} from '../types'

export type CheckboxClassesType = ComponentClassesType & {
  circle: ComponentAssociativeType
  icon: ComponentAssociativeType
  input: ComponentAssociativeType
  item: ComponentAssociativeType
  required: ComponentAssociativeType
  right: ComponentAssociativeType
  switch: ComponentAssociativeType
  text: ComponentAssociativeType
}

export type CheckboxSetupType = ComponentBaseType & {
  classes: ComputedRef<CheckboxClassesType>
  type: string

  isText: ComputedRef<boolean>
  isValue: ComputedRef<boolean>
  isEnabled: ComputedRef<boolean>
  isRipple: ComputedRef<boolean>

  iconBind: ComputedRef<AssociativeType>
  inputBind: ComputedRef<AssociativeType>

  valueBind: Ref<BooleanOrNumberOrStringType>
  valueOriginalBind: ComputedRef<string>

  messageBind: ComputedRef<AssociativeType>
  validationMessageBind: ComputedRef<string>

  checkValidity: () => boolean
  onChecked: (event: Event) => void
  onRadio: (event: Event) => void
}
