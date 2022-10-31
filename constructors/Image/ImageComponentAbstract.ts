import {ComputedRef} from "vue";
import {ComponentAbstract} from "../../classes/ComponentAbstract";
import {AssociativeType, ComponentClassesType, ComponentStylesType, ImageOptionType} from "../types";
import {props} from "./props";
import {Image} from "./Image";

export type ImageSetupType = {
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
  text: ImageOptionType
}

export abstract class ImageComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType

  setup(): ImageSetupType {
    const image = new Image(
      this.refs.value,
      this.refs.coordinator,
      this.refs.size,
      this.refs.x,
      this.refs.y,
      this.refs.adaptive,
      this.refs.url,
      this.getClassName()
    )

    const classes = this.getClasses({main: image.classes})
    const styles = this.getStyles({main: image.styles})

    return {
      ...this.baseInit(),
      classes,
      styles,
      text: image.text
    }
  }
}
