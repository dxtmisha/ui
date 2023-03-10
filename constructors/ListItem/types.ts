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
import { ListItemCheckboxSetupType } from './ListItemCheckbox'

export type ListItemClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  main: T
  checkbox: T
  body: T
  text: T
  title: T
  prefix: T
  suffix: T
  description: T
  short: T
  context: T
}

export type ListItemSetupType = ComponentBaseType &
  UseValueSetupType &
  UseProgressSetupType &
  ListItemTextSetupType &
  ListItemIconSetupType &
  ListItemCheckboxSetupType &
  {
    classes: ComputedRef<ListItemClassesType>

    isRipple: ComputedRef<boolean>
    isInverse: ComputedRef<boolean>

    onClick: EventCallbackRequiredType<void, MouseEvent>
  }
