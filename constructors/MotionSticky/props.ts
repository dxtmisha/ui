import { PropType } from 'vue'
import { ElementType } from '../types'

export const props = {
  // Values
  element: {
    type: [Element, String, Window] as PropType<ElementType | string>,
    default: window
  },

  // Status

  // Options
  tag: {
    type: String,
    default: 'div'
  },
  className: {
    type: String,
    default: 'is-sticky'
  }
}

export default {
  props
}
