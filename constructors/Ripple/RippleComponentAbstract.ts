import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { createElement } from '../../functions'
import { props } from './props'
import {
  AssociativeType, ComponentBaseType,
  EventCallbackRequiredType
} from '../types'

export type RippleSetupType = ComponentBaseType & {
  onClick: EventCallbackRequiredType<void, MouseEvent>
}

export abstract class RippleComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  setup (): RippleSetupType {
    const classes = this.getClasses()
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      onClick: (event: MouseEvent) => this.add(event.offsetX, event.offsetY)
    }
  }

  add (x: number, y: number): void {
    if (this.element.value) {
      const className = this.getItem().getBasicClassName()

      createElement(this.element.value, 'span', item => {
        item.onanimationend = () => item.classList.add('is-end')
        // item.ontransitionend = () => item.parentElement?.removeChild(item)

        item.style.setProperty(`--${className}-_x`, `${x}px`)
        item.style.setProperty(`--${className}-_y`, `${y}px`)
        item.classList.add(this.getClassName(['item']))
      })
    }
  }
}
