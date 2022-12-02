import { onUnmounted } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { Image } from './Image'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType,
  ImageOptionType
} from '../types'

export type ImageSetupType = ComponentBaseType & {
  text: ImageOptionType
}

export abstract class ImageComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  setup (): ImageSetupType {
    const image = new Image(
      this.element,
      this.refs.value,
      this.refs.coordinator,
      this.refs.size,
      this.refs.x,
      this.refs.y,
      this.refs.adaptive,
      this.refs.objectWidth,
      this.refs.objectHeight,
      this.refs.url,
      this.getClassName()
    )

    const classes = this.getClasses({ main: image.classes })
    const styles = this.getStyles({ main: image.styles })

    onUnmounted(() => image.destructor())

    return {
      ...this.getBasic(),
      classes,
      styles,
      text: image.text
    }
  }
}
