import { ComputedRef, Ref } from 'vue'
import { AssociativeType, ComponentAssociativeType, ComponentBaseType, ComponentClassesType } from '../types'
import { UseIconSetupType } from '../Use/UseIcon'

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

export type FieldIconSetupType = UseIconSetupType & {
  iconCancelBind: ComputedRef<string | AssociativeType>
  iconPreviousBind: ComputedRef<string | AssociativeType>
  iconNextBind: ComputedRef<string | AssociativeType>
}

export type FieldAlignSetupType = {
  leftElement: Ref<HTMLElement | undefined>
  left: Ref<string>
  isLeft: ComputedRef<boolean>

  rightElement: Ref<HTMLElement | undefined>
  right: Ref<string>
  isRight: ComputedRef<boolean>

  heightContext: Ref<string>
}

export type FieldPrefixSetupType = {
  prefixElement: Ref<HTMLElement | undefined>
  prefixWidth: Ref<string>
  isPrefix: ComputedRef<boolean>

  suffixElement: Ref<HTMLElement | undefined>
  suffixWidth: Ref<string>
  isSuffix: ComputedRef<boolean>
}

export type FieldSetupType =
  ComponentBaseType &
  FieldIconSetupType &
  FieldAlignSetupType &
  FieldPrefixSetupType &
  {
    classes: ComputedRef<FieldClassesType>
    id: string
    isEnabled: ComputedRef<boolean>
    isRequired: ComputedRef<boolean>
    isRipple: ComputedRef<boolean>
    isScoreboard: ComputedRef<boolean>
    isCancel: ComputedRef<boolean>
    isValidation: ComputedRef<boolean>
    iconBind: ComputedRef<string | AssociativeType>
    iconTrailingBind: ComputedRef<string | AssociativeType>
    messageBind: ComputedRef<AssociativeType>
    validationText: ComputedRef<string>
    update: () => void
    onClick: (event: MouseEvent) => void
  }
