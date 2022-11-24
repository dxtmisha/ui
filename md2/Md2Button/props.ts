import { PropType } from 'vue'
import { props as propsButton } from '../../constructors/Button/props'
import { Md2PaletteType } from '../md2PropsType'

export const props = {
  ...propsButton,
  palette: String as PropType<Md2PaletteType>
}
