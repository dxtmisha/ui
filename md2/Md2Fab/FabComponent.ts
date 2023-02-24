import { FabComponentAbstract } from '../../constructors/Fab/FabComponentAbstract'
import { props } from './props'
import { AssociativeType } from '../../constructors/types'

export class FabComponent extends FabComponentAbstract {
  static readonly code = 'md2.fab' as string
  static readonly instruction = props as AssociativeType

  constructor (
    props: AssociativeType & object,
    context: AssociativeType & object
  ) {
    super(props, context, ['all'])
  }
}
