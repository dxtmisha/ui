import { ComputedRef } from 'vue'

import { ListItemIconSetupType } from './ListItemIcon'
import { ListItemTextSetupType } from './ListItemText'
import { UseProgressSetupType } from '../Progress/UseProgress'
import { UseValueSetupType } from '../Use/UseValue'

import {
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  EventCallbackRequiredType
} from '../types'

export type ListItemClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  main: T
  text: T
  title: T
  prefix: T
  suffix: T
  description: T
  context: T
}

export type ListItemSetupType = ComponentBaseType &
  UseValueSetupType &
  UseProgressSetupType &
  ListItemTextSetupType &
  ListItemIconSetupType &
  {
    classes: ComputedRef<ListItemClassesType>

    isRipple: ComputedRef<boolean>

    onClick: EventCallbackRequiredType<void, MouseEvent>
  }
