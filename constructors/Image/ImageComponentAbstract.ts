import {ComputedRef} from "vue";
import {ComponentAbstract} from "../../classes/ComponentAbstract";
import {AssociativeType, ComponentClassesType, ComponentStylesType} from "../types";
import {props} from "./props";

export type ImageSetupType = {
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
  // text: ImageDateType
}

export abstract class ImageComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType

  setup(): ImageSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.baseInit(),
      classes,
      styles
    }
  }
}
