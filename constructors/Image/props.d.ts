import { NumberOrStringType } from '../types'

export declare type ImagePropsType = {
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

  // Options
  url?: string
}
