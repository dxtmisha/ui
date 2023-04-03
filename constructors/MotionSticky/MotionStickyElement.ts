import { getIdElement } from '../../functions/element'

import { UseElementFocus } from '../Use/UseElementFocus'

export class MotionStickyElement extends UseElementFocus {
  private readonly id = `sticky--id--${getIdElement()}` as string

  getId (): string {
    return this.id
  }
}
