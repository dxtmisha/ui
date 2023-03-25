import { PropType } from 'vue'
import { ElementType } from '../types'

export const props = {
  // Values
  element: [Element, String] as PropType<ElementType | string>,
  page: String,

  // Options
  tag: {
    type: String,
    default: 'div'
  },
  scroll: {
    type: Boolean,
    default: false
  }
}

export default {
  props
}
