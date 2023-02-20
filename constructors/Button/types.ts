import { ComputedRef } from 'vue'
import { UseIconSetupType } from '../Use/UseIcon'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  EventCallbackRequiredType
} from '../types'

export type ButtonClassesType = ComponentClassesType & {
  text: ComponentAssociativeType
}

export type ButtonSetupType = ComponentBaseType &
  UseIconSetupType &
  {
    classes: ComputedRef<ButtonClassesType>
    isInverse: ComputedRef<boolean>
    isRipple: ComputedRef<boolean>
    isText: ComputedRef<boolean>
    disabledBind: ComputedRef<boolean | undefined>
    iconBind: ComputedRef<string | AssociativeType>
    iconTrailingBind: ComputedRef<string | AssociativeType>
    progressBind: ComputedRef<AssociativeType>
    valueBind: ComputedRef
    onClick: EventCallbackRequiredType<void, MouseEvent>
  }
