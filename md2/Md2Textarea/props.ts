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
  text: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  placeholder: String,
  name: String,
  value: [Number, String],
  detail: [Object],

  // Input
  required: Boolean,

  autofocus: Boolean,
  inputmode: String,
  spellcheck: Boolean,

  minlength: Number,
  maxlength: Number,

  input: Object,

  // Message
  counter: Boolean,
  helperMessage: String,
  validationMessage: String,
  validationCode: [Object],

  // On
  modelValue: undefined,
  on: {
    type: Object,
    default: {}
  },

  // Status
  selected: Boolean,
  readonly: Boolean,
  disabled: Boolean,

  // Options
  palette: String as PropType<Md2PaletteType>,
  appearance: {
    type: String as PropType<Md2FieldAppearanceType>,
    default: defaultItem.defaultValue('appearance')
  },
  rounded: {
    type: String as PropType<Md2FieldRoundedType>,
    default: defaultItem.defaultValue('rounded')
  },
  width: {
    type: [Number, String] as PropType<Md2FieldWidthType>,
    default: defaultItem.defaultValue('width')
  },
  height: {
    type: [Number, String] as PropType<Md2FieldHeightType>,
    default: defaultItem.defaultValue('height')
  },
  field: {
    type: Object,
    default: defaultItem.defaultValue('field')
  }
}
