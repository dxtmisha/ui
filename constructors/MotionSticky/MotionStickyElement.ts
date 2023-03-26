import { UseElementFocus } from '../Use/UseElementFocus'
import { getIdElement } from '../../functions'

export class MotionStickyElement extends UseElementFocus {
  private readonly id = `sticky--id--${getIdElement()}` as string

  getId (): string {
    return this.id
  }
}
