import { DefaultConfiguration } from '../../classes/DefaultConfiguration'
import { PropType } from 'vue'

const defaultProps = DefaultConfiguration.init('progress')

export type ProgressIndeterminateType = 'type1' | 'type2'
export type ProgressTypeType = 'linear' | 'circular'

export const props = {
  // Values
  value: {
    type: Number,
    default: null
  },
  max: {
    type: Number,
    default: 100
  },

  // Status
  visible: Boolean,

  // Options
  type: {
    type: String as PropType<ProgressTypeType>,
    default: 'linear',
    validator: DefaultConfiguration.validator<string>([
      'linear',
      'circular'
    ])
  },
  bottom: {
    type: Boolean,
    default: defaultProps('bottom')
  },
  indeterminate: {
    type: String as PropType<ProgressIndeterminateType>,
    default: defaultProps('indeterminate', 'type1'),
    validator: DefaultConfiguration.validator<string>([
      'type1',
      'type2'
    ])
  },
  delay: {
    type: Number,
    default: defaultProps('delay', 400)
  }
}
