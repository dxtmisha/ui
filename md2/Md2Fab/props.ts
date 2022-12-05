import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2FabAdaptiveType,
  Md2FabHeightType,
  Md2FabRoundedType
} from './props.type'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.fab')
export const props = {
  // Values
  detail: [Object],
  icon: [Object, String],
  text: [Number, String],
  to: String,
  value: [Number, Object, String],

  // Status
  disabled: Boolean,
  progress: Boolean,

  // Options
  adaptive: {
    type: String as PropType<Md2FabAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  ellipsis: {
    type: Boolean,
    default: defaultItem.defaultValue('ellipsis')
  },
  height: {
    type: [Number, String] as PropType<Md2FabHeightType>,
    default: defaultItem.defaultValue('height')
  },
  lowercase: {
    type: Boolean,
    default: defaultItem.defaultValue('lowercase')
  },
  palette: String as PropType<Md2PaletteType>,
  rounded: {
    type: String as PropType<Md2FabRoundedType>,
    default: defaultItem.defaultValue('rounded'),
    validator: defaultItem.validator('rounded')
  },
  tag: {
    type: String,
    default: 'button'
  },
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  }
}
