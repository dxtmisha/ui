import { PropType } from 'vue'
import { ArrayOrStringType } from '../types'
import { MaskPatternType, MaskSpecialType, MaskTypeType } from './types'

export const props = {
  // Values
  currency: {
    type: String as PropType<string>,
    default: 'USD'
  },
  fraction: [Boolean, Number] as PropType<boolean | number>,
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
    type: [Array, Object, String] as PropType<MaskSpecialType>,
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
    type: String as PropType<MaskTypeType>,
    default: 'text'
  }
}

export default {
  props
}
