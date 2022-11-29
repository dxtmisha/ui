import { PropType } from 'vue'
import { props as propsChips } from '../../constructors/Chips/props'
import { Md2PaletteType } from '../md2PropsType'

export const props = {
  ...propsChips,
  palette: String as PropType<Md2PaletteType>
}
