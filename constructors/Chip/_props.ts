import { PropType } from 'vue'
import { DefaultConfiguration } from '../../classes/DefaultConfiguration'
import { props as propsButton } from '../Button/props'
import { ButtonAdaptiveType } from '../Button/props.type'

const defaultProps = DefaultConfiguration.init('chip')

export const _props = {
  ...propsButton,

  // Status
  iconHide: Boolean,
  readonly: Boolean,

  // Options
  adaptive: {
    type: String as PropType<ButtonAdaptiveType>,
    default: defaultProps('adaptive', 'full')
  }
}
