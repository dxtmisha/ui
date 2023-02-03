import { TextareaComponentAbstract } from '../../constructors/Textarea/TextareaComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class TextareaComponent extends TextareaComponentAbstract {
  static readonly code = 'md2.textarea' as string
  static readonly instruction = props as AssociativeType
}
