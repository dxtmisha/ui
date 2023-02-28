import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import { Md2PaletteType } from '../props.type'

export const defaultItem = ComponentDesign.getDefault('md2.switch')
export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  name: String,
  value: [Boolean, Number, String],
  valueDefault: {
    type: String,
    default: '1'
  },
  detail: [Object],

  // Input
  required: Boolean,
  input: Object,

  // Message
  helperMessage: String,
  validationCode: [String, Object],
  validationMessage: String,

  // On
  modelValue: undefined,
  on: {
    type: Object,
    default: {}
  },

  // Status
  progress: Boolean,
  disabled: Boolean,
  readonly: Boolean,

  // Options
  palette: String as PropType<Md2PaletteType>,
  right: Boolean,
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  }
}
