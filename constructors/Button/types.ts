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

    isText: ComputedRef<boolean>
    isRipple: ComputedRef<boolean>
    isInverse: ComputedRef<boolean>

    valueBind: ComputedRef
    progressBind: ComputedRef<AssociativeType>
    disabledBind: ComputedRef<boolean | undefined>

    onClick: EventCallbackRequiredType<void, MouseEvent>
  }
