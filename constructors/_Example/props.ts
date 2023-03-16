import { PropType } from 'vue'
import { ComponentDesign } from '../../classes/ComponentDesign'

export const defaultItem = ComponentDesign.getDefault('design.example')
export const props = {
  // Values

  // Status

  // Options
  example: {
    type: String as PropType<string>,
    default: defaultItem.defaultValue('example'),
    validator: defaultItem.validator('example')
  }
}
