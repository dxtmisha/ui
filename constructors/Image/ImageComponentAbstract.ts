import { ComputedRef, onUnmounted } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { Image } from './Image'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType,
  ComponentClassesType,
  ComponentStylesType,
  ImageOptionType
} from '../types'

export type ImageSetupType = ComponentBaseType & {
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
  text: ImageOptionType
}

export abstract class ImageComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType

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
