import { ComputedRef, Ref } from 'vue'
import { AssociativeType, ComponentAssociativeType, ComponentBaseType, ComponentClassesType } from '../types'

export type FieldClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  body: T
  input: T
  hidden: T
  label: T
  labelTop: T
  title: T
  text: T
  required: T
  scoreboard: T
  scoreboardContext: T
  scoreboardSpace: T
  prefix: T
  suffix: T
  border: T
}

export type FieldSetupType = ComponentBaseType & {
  classes: ComputedRef<FieldClassesType>
  id: string
  leftElement: Ref<HTMLElement | undefined>
  rightElement: Ref<HTMLElement | undefined>
  prefixElement: Ref<HTMLElement | undefined>
  suffixElement: Ref<HTMLElement | undefined>
  isLeft: ComputedRef<boolean>
  isRequired: ComputedRef<boolean>
  isRight: ComputedRef<boolean>
  isRipple: ComputedRef<boolean>
  isPrefix: ComputedRef<boolean>
  isSuffix: ComputedRef<boolean>
  isCancel: ComputedRef<boolean>
  isValidation: ComputedRef<boolean>
  iconBind: ComputedRef<string | AssociativeType>
  iconTrailingBind: ComputedRef<string | AssociativeType>
  iconCancelBind: ComputedRef<string | AssociativeType>
  iconPreviousBind: ComputedRef<string | AssociativeType>
  iconNextBind: ComputedRef<string | AssociativeType>
  messageBind: ComputedRef<AssociativeType>
  left: Ref<string>
  right: Ref<string>
  prefixWidth: Ref<string>
  suffixWidth: Ref<string>
  validationText: ComputedRef<string>
  update: () => void
  onClick: (event: MouseEvent) => void
}
