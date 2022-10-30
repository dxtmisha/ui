import {ImageComponentAbstract} from "../../constructors/Image/ImageComponentAbstract";
import {AssociativeType} from "../../constructors/types";
import properties from "./properties.json"

export class ImageComponent extends ImageComponentAbstract {
  protected readonly design = properties as AssociativeType
}
