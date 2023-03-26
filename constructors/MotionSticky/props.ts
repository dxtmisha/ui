import { PropType } from 'vue'
import { ElementType } from '../types'

export const props = {
  // Values
  element: [Element, String] as PropType<ElementType | string>,

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
