import { ComputedRef, Ref } from 'vue'
import {
  AssociativeType,
  ComponentAssociativeType,
  ComponentBaseType,
  ComponentClassesType
} from '../types'

export type WindowStatusType = 'preparation' | 'flash' | 'open' | 'hide' | 'close'

export type WindowEmitType = {
  open: boolean,
  element: HTMLElement | undefined
  control: HTMLElement | undefined
  id: string
}

export type WindowClientType = {
  x: number
  y: number
}

export type WindowCoordinatesType = {
  top: number
  right: number
  bottom: number
  left: number
  width: number
  height: number
  innerWidth: number
  innerHeight: number
}

export type WindowClassesControlType = {
  [key: string]: string
  block: string
  close: string
  controlStatic: string
  static: string
}

export type WindowClassesType<T = ComponentAssociativeType> = ComponentClassesType<T> & {
  control: T
  body: T
  context: T
}

export type WindowSetupType = ComponentBaseType & {
  classes: ComputedRef<WindowClassesType>
  id: string
  open: Ref<boolean>
  status: Ref<WindowStatusType>
  isOpen: ComputedRef<boolean>
  toggle: (value: boolean) => void
  on: AssociativeType<(event: MouseEvent & TouchEvent) => void>
  onAnimation: () => void
  onTransition: () => void
}
