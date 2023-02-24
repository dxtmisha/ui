import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import {
  Md2FabAdaptiveType,
  Md2FabHeightType,
  Md2FabRoundedType,
  Md2FabWidthType
} from './props.type'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.fab')
export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  to: String,
  value: [Number, Object, String],
  detail: [Object],

  // Status
  progress: Boolean,
  disabled: Boolean,
  dragged: Boolean,

  // Options
  tag: {
    type: String,
    default: 'button'
  },
  palette: String as PropType<Md2PaletteType>,
  adaptive: {
    type: String as PropType<Md2FabAdaptiveType>,
    default: defaultItem.defaultValue('adaptive'),
    validator: defaultItem.validator('adaptive')
  },
  rounded: {
    type: String as PropType<Md2FabRoundedType>,
    default: defaultItem.defaultValue('rounded'),
    validator: defaultItem.validator('rounded')
  },
  width: {
    type: String as PropType<Md2FabWidthType>,
    default: defaultItem.defaultValue('width')
  },
  height: {
    type: [Number, String] as PropType<Md2FabHeightType>,
    default: defaultItem.defaultValue('height')
  },
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  }
}
