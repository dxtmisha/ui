import { onUnmounted } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { Image } from './Image'
import { props } from './props'
import {
  AssociativeType
} from '../types'
import { ComponentBaseType, ImageOptionType } from '../typesRef'

export type ImageSetupType = ComponentBaseType & {
  text: ImageOptionType
}

export abstract class ImageComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  protected readonly stylesProps = [''] as string[]

  protected readonly image: Image

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.image = new Image(
      this.element,
      this.refs.value,
      this.refs.coordinator,
      this.refs.size,
      this.refs.x,
      this.refs.y,
      this.refs.adaptive,
      this.refs.objectWidth,
      this.refs.objectHeight,
      this.refs.url
    )
  }

  setup (): ImageSetupType {
    const classes = this.getClasses({ main: this.image.classes })
    const styles = this.getStyles({ main: this.image.styles })

    onUnmounted(() => this.image.destructor())

    return {
      ...this.getBasic(),
      classes,
      styles,
      text: this.image.text
    }
  }
}
