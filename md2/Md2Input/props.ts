import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'
import { InputMatchType, InputTypeType } from '../../constructors/Input/types'
import { Md2PaletteType } from '../props.type'
import {
  Md2FieldAlignType,
  Md2FieldAppearanceType,
  Md2FieldCancelType,
  Md2FieldHeightType,
  Md2FieldRoundedType,
  Md2FieldWidthType
} from '../Md2Field/props.type'

export const defaultItem = ComponentDesign.getDefault('md2.input')
export const props = {
  // Values
  text: [Number, String],
  icon: [Object, String],
  iconTrailing: [Object, String],
  prefix: [Number, String],
  suffix: [Number, String],
  placeholder: String,
  name: String,
  value: [Number, String],
  detail: [Object],

  // Input
  type: {
    type: String as PropType<InputTypeType>,
    default: 'text'
  },
  required: Boolean,
  mask: [Object, String],
  pattern: String,

  autofocus: Boolean,
  autocomplete: {
    type: String,
    default: 'off'
  },
  inputmode: String,
  spellcheck: Boolean,

  minlength: Number,
  maxlength: Number,

  step: Number,
  min: [Number, String],
  max: [Number, String],

  input: Object,
  inputMatch: [Object, String] as PropType<InputMatchType>,

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
  arrow: Boolean,
  align: String as PropType<Md2FieldAlignType>,
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
  cancel: {
    type: String as PropType<Md2FieldCancelType>,
    default: defaultItem.defaultValue('cancel', 'auto')
  },
  ripple: {
    type: Boolean,
    default: defaultItem.defaultValue('ripple', true)
  },
  field: {
    type: Object,
    default: defaultItem.defaultValue('field')
  },

  // Icon
  iconCancel: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconCancel', 'cancel')
  },
  iconNext: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconNext', {
      icon: 'chevron_right',
      size: 'sm'
    })
  },
  iconPrevious: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconPrevious', {
      icon: 'chevron_left',
      size: 'sm'
    })
  },
  iconVisibility: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconVisibility', 'visibility')
  },
  iconVisibilityOff: {
    type: [Object, String],
    default: defaultItem.defaultValue('iconVisibilityOff', 'visibility_off')
  }
}
