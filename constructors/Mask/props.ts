export const props = {
  // Values
  mask: {
    type: [Array, String],
    required: true
  },
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
  pattern: [RegExp, String],
  value: String,

  // Message
  counter: Number,
  helperMessage: String,
  maxlength: Number,
  validationMessage: [Boolean, String],

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
  locales: String,
  placeholder: {
    type: String,
    default: true
  },
  special: {
    type: String,
    default: '_'
  },
  type: {
    type: String,
    default: 'text'
  }
}

export default {
  props
}
