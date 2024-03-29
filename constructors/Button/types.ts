import { ComputedRef } from 'vue'

import { UseIconSetupType } from '../Use/UseIcon'
import { UseProgressSetupType } from '../Progress/UseProgress'
import { UseValueSetupType } from '../Use/UseValue'

import {
  AssociativeType,
  EventCallbackRequiredType
} from '../types'
import { ComponentAssociativeType, ComponentBaseType, ComponentClassesType } from '../typesRef'

export type ButtonClassesType = ComponentClassesType & {
  text: ComponentAssociativeType
}

export type ButtonSetupType = ComponentBaseType &
  UseIconSetupType &
  UseProgressSetupType &
  UseValueSetupType &
  {
    classes: ComputedRef<ButtonClassesType>

    isText: ComputedRef<boolean>
    isRipple: ComputedRef<boolean>
    isInverse: ComputedRef<boolean>

    progressBind: ComputedRef<AssociativeType>
    disabledBind: ComputedRef<boolean | undefined>

    onClick: EventCallbackRequiredType<void, MouseEvent>
  }
