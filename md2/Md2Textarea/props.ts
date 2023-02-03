import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import { Md2PaletteType } from '../props.type'
import {
  Md2FieldAppearanceType,
  Md2FieldHeightType,
  Md2FieldRoundedType,
  Md2FieldWidthType
} from '../Md2Field/props.type'

export const defaultItem = ComponentDesign.getDefault('md2.textarea')
export const props = {
  // Values
  detail: [Object],
  icon: [Object, String],
  iconTrailing: [Object, String],
  name: String,
  required: Boolean,
  text: [Number, String],
  value: [Number, String],

  // Input
  autofocus: Boolean,
  inputmode: String,
  minlength: Number,
  maxlength: Number,
  placeholder: String,
  spellcheck: Boolean,
  input: Object,

  // Message
  counter: Boolean,
  helperMessage: String,
  validationCode: [Object],
  validationMessage: String,

  // On
  modelValue: undefined,
  on: {
    type: Object,
    default: {}
  },

  // Status
  disabled: Boolean,
  readonly: Boolean,
  selected: Boolean,

  // Options
  appearance: {
    type: String as PropType<Md2FieldAppearanceType>,
    default: defaultItem.defaultValue('appearance')
  },
  height: {
    type: [Number, String] as PropType<Md2FieldHeightType>,
    default: defaultItem.defaultValue('height')
  },
  palette: String as PropType<Md2PaletteType>,
  rounded: {
    type: String as PropType<Md2FieldRoundedType>,
    default: defaultItem.defaultValue('rounded')
  },
  width: {
    type: [Number, String] as PropType<Md2FieldWidthType>,
    default: defaultItem.defaultValue('width')
  },
  field: {
    type: Object,
    default: defaultItem.defaultValue('field')
  }
}
