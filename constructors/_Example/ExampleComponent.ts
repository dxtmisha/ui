import { ExampleComponentAbstract } from './constructors/ExampleComponentAbstract'
import { AssociativeType } from '../types'

export class ExampleComponent extends ExampleComponentAbstract {
  static readonly code = 'design.example' as string
  static readonly instruction = {} as AssociativeType
}
