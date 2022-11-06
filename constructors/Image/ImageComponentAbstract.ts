import { ComputedRef, onUnmounted, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { Image } from './Image'
import { props } from './props'
import { AssociativeType, ComponentClassesType, ComponentStylesType, ImageOptionType } from '../types'

export type ImageSetupType = {
  element: Ref<HTMLElement | undefined>
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
  text: ImageOptionType
}

export abstract class ImageComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType

  setup (): ImageSetupType {
    const element = ref(undefined)
    const image = new Image(
      element,
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
      element,
      ...this.baseInit(),
      classes,
      styles,
      text: image.text
    }
  }
}
