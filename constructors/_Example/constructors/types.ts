import {
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType
} from '../../types'

export type ExampleClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  text: T
}

export type ExampleSetupType = ComponentBaseType
