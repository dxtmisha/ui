import { ComputedRef, Ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { createElement } from '../../functions'
import { props } from './props'
import {
  AssociativeType,
  ComponentClassesType,
  ComponentStylesType,
  EventCallbackRequiredType
} from '../types'

export type RippleSetupType = {
  element: Ref<HTMLElement | undefined>
  name: ComputedRef<string>
  nameDesign: ComputedRef<string>
  baseClass: ComputedRef<string>
  classes: ComputedRef<ComponentClassesType>
  styles: ComputedRef<ComponentStylesType>
  onClick: EventCallbackRequiredType<void, MouseEvent>
}

export abstract class RippleComponentAbstract extends ComponentAbstract {
  protected readonly instruction = props as AssociativeType

  setup (): RippleSetupType {
    const classes = this.getClasses({})
    const styles = this.getStyles({})

    return {
      ...this.baseInit(),
      classes,
      styles,
      onClick: (event: MouseEvent) => this.add(event.offsetX, event.offsetY)
    }
  }

  add (x: number, y: number): void {
    if (this.element.value) {
      createElement(this.element.value, 'span', item => {
        item.onanimationend = () => item.classList.add('is-end')
        item.ontransitionend = () => item.parentElement?.removeChild(item)

        item.style.setProperty(`--${this.baseClass.value}-_x`, `${x}px`)
        item.style.setProperty(`--${this.baseClass.value}-_y`, `${y}px`)
        item.classList.add(this.getClassName(['item']))
      })
    }
  }
}
