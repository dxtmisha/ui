import { NumberOrStringType } from '../types'

export type ImagePropsType = {
  // Values
  value: File | string,
  coordinator?: [number, number, number, number]
  size?: NumberOrStringType
  x?: NumberOrStringType
  y?: NumberOrStringType

  // Adaptive
  adaptive?: boolean
  objectWidth?: number
  objectHeight?: number

  // Status
  disabled?: boolean
  hide?: boolean
  turn?: boolean

  // Options
  url?: string
}
