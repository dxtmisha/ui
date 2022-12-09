import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'
import { createElement } from '../../functions'
import { computed, ComputedRef, Ref, ref } from 'vue'

export type ScrollbarSetupType = ComponentBaseType

export abstract class ScrollbarComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  static readonly INDEX = `${process.env.VUE_APP_PREFIX}-scroll`

  static width = ref(parseInt(sessionStorage.getItem(this.INDEX) || '-1')) as Ref<number>
  static disabled = computed(() => this.width.value < 8) as ComputedRef<boolean>
  static calculate = false as boolean

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.getConstructor<typeof ScrollbarComponentAbstract>().think()
  }

  setup (): ScrollbarSetupType {
    const classes = this.getClasses({
      main: {
        'is-disabled': this.getConstructor<typeof ScrollbarComponentAbstract>().disabled
      }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles
    }
  }

  private static createElement () {
    return createElement(document.body, 'div', element => {
      element.style.height = '24px'
      element.style.overflowY = 'scroll'
      element.style.position = 'fixed'
      element.style.width = '100%'

      createElement(element, 'div', element => {
        element.style.height = '100px'
      })
    })
  }

  private static init (): Promise<number> {
    return new Promise(resolve => {
      this.calculate = true
      const element = this.createElement()

      requestAnimationFrame(() => {
        resolve(element.offsetWidth - element.clientWidth)

        element.remove()
        this.calculate = false
      })
    })
  }

  private static setWidth (value: number) {
    sessionStorage.setItem(this.INDEX, value.toString())
    this.width.value = value
  }

  private static think () {
    if (
      !this.calculate &&
      this.width.value === -1
    ) {
      this.init().then((width: number) => this.setWidth(width))
    }
  }
}
