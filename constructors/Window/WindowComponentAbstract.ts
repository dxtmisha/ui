import { computed, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { getIdElement } from '../../functions'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'
import Element from '../../functions/element'

export type WindowSetupType = ComponentBaseType

export abstract class WindowComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-open', 'on-close'] as string[]

  static readonly classClose = 'window-close'
  static readonly classBlock = 'window-block'
  static readonly classStatic = 'window-static'
  static readonly classStaticControl = 'window-static-control'

  private id = `w--${getIdElement()}` as string
  private open = ref(false)
  private persistent = ref(false)

  private targetElement = ref() as Ref<HTMLElement>
  private focusElement = computed(() => this.targetElement.value?.closest(this.getItem().getBasicClassName())) as Ref<HTMLElement>

  setup (): WindowSetupType {
    const classes = this.getClasses({
      main: {}
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }

  async emit () {
    // CLOSE
  }

  getControlElement (focus?: HTMLElement): Element | null {
    return focus ? document.querySelector(`[data-control="${focus.dataset.window}"]`) : null
  }

  private getWindowConstructor () {
    return this.constructor as typeof WindowComponentAbstract
  }

  private isNotBlock () {
    return !this.targetElement.value.classList.contains(this.getItem().getBasicClassName()) &&
      !this.getControlElement(this.focusElement.value)?.closest(`.${this.id} .${this.getWindowConstructor().classBlock}`)
  }

  async verification (target: HTMLElement) {
    this.targetElement.value = target

    if (this.open.value) {
      if (this.focusElement.value === null) {
        await this.emit()
      } else if (!this.isVerificationFocus()) {
        if (this.isNotBlock()) {
          if (this.isVerificationChildren()) {
            requestAnimationFrame(async () => {
              if (!this.focusElement.value?.classList.contains('is-show')) {
                await this.emit()
              }
            })
          } else {
            await this.emit()
          }
        }
      } else if (this.isVerificationTarget()) {
        if (this.props.persistent) {
          this.persistent.value = true
        } else {
          await this.emit()
        }
      } else if (this.isVerificationAutoClose()) {
        await this.emit()
      }
    } else if (this.isVerificationDisabled()) {
      await this.emit()
    }
  }

  private isVerificationAutoClose (): boolean {
    const constructor = this.getWindowConstructor()
    const target = this.targetElement.value
    const selectors1 = `.${this.id} .${constructor.classClose}:not(.${constructor.classStatic})`
    const selectors2 = `.${this.id} .${constructor.classStatic}, .${this.id} .${this.getItem().getClassName(['control'])}`

    return target?.closest(selectors1) ||
      (this.props.autoClose && !target?.closest(selectors2))
  }

  private isVerificationChildren (target = this.targetElement.value as Element | null): boolean {
    const focus = target?.closest(this.getItem().getBasicClassName()) as HTMLElement

    if (focus) {
      return focus.dataset.window === this.id ||
        this.isVerificationChildren(this.getControlElement(focus))
    } else {
      return false
    }
  }

  private isVerificationDisabled (): boolean {
    return !this.props.disabled &&
      !this.targetElement.value?.closest(`.${this.id} .${this.getWindowConstructor().classStaticControl}`)
  }

  private isVerificationFocus (): boolean {
    return this.focusElement.value === this.element.value
  }

  private isVerificationTarget (): boolean {
    return this.targetElement.value === this.element.value
  }
}
