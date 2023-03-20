import { PropType } from 'vue'
import { NumberOrStringType } from '../types'

export const props = {
  // Values
  name: [Number, String] as PropType<NumberOrStringType>,

  // Status
  selected: String,
  preparation: String
}

export default {
  props
}
