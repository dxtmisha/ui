import { ComputedRef, Ref, ref } from 'vue'
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
  protected readonly element = ref<HTMLElement | undefined>()

  setup (): RippleSetupType {
    const classes = this.getClasses({})
    const styles = this.getStyles({})

    return {
      element: this.element,
      ...this.baseInit(),
      classes,
      styles,
      onClick: (event: MouseEvent) => this.add(event.offsetX, event.offsetY)
    }
  }

  add (x: number, y: number): void {
    if (this.element.value) {
      createElement(this.element.value, 'span', item => {
        item.onanimationend = () => item.classList.add('step-1')
        item.ontransitionend = () => item.parentElement?.removeChild(item)

        item.style.setProperty(`--_${this.baseClass.value}-x`, `${x}px`)
        item.style.setProperty(`--_${this.baseClass.value}-y`, `${y}px`)
        item.classList.add(this.getClassName(['item']))
      })
    }
  }
}
