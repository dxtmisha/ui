import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'

export const defaultItem = ComponentDesign.getDefault('md2.motion-transform')
export const props = {
  // Values

  // Status
  open: Boolean,

  // Options
  example: {
    type: String as PropType<string>,
    default: defaultItem.defaultValue('example'),
    validator: defaultItem.validator('example')
  }
}
