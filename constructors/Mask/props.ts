import { PropType } from 'vue'
import { ArrayOrStringType, AssociativeOrStringType, AssociativeType } from '../types'
import { MaskPatternType, MaskSpecialType, MaskTypeType } from './types'

export const props = {
  // Values
  mask: [Array, String] as PropType<ArrayOrStringType>,
  special: {
    type: [Array, Object, String] as PropType<MaskSpecialType>,
    default: '*'
  },
  pattern: [Function, Object, String] as PropType<MaskPatternType>,
  fraction: [Boolean, Number] as PropType<boolean | number>,
  currency: {
    type: String as PropType<string>,
    default: 'USD'
  },
  match: {
    type: [Object, RegExp] as PropType<AssociativeType<RegExp> | RegExp>,
    default: /[0-9]/
  },
  name: String,
  value: String,
  paste: Boolean,

  // On
  on: {
    type: Object,
    default: {}
  },

  // Status
  visible: {
    type: Boolean,
    default: true
  },

  // Options
  type: {
    type: String as PropType<MaskTypeType>,
    default: 'text'
  },
  input: {
    type: String,
    default: 'text'
  },
  view: {
    type: [Object, String] as PropType<AssociativeOrStringType>,
    default: '_'
  },
  right: Boolean as PropType<boolean>
}

export default {
  props
}
