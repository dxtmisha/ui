import { PropType } from 'vue'
import { ArrayOrStringType, GeoDateType } from '../types'
import { MaskPatternType } from './types'

export const props = {
  // Values
  mask: [Array, String] as PropType<ArrayOrStringType>,
  match: {
    type: RegExp,
    default: /[0-9]/
  },
  max: String,
  min: String,
  on: {
    type: Object,
    default: {}
  },
  paste: Boolean,
  pattern: [Function, Object, String] as PropType<MaskPatternType>,
  special: {
    type: [Array, String] as PropType<ArrayOrStringType>,
    default: '*'
  },
  value: String,

  // Status
  visible: {
    type: Boolean,
    default: true
  },

  // Options
  input: {
    type: String,
    default: 'text'
  },
  placeholder: String,
  type: {
    type: String as PropType<GeoDateType | 'text'>,
    default: 'text'
  }
}

export default {
  props
}
