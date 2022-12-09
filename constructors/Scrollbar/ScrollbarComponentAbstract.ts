import { computed, ComputedRef, Ref, ref, watchEffect } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { EventItem } from '../../classes/EventItem'
import { createElement } from '../../functions'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type ScrollbarSetupType = ComponentBaseType

export abstract class ScrollbarComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType

  static readonly INDEX = `${process.env.VUE_APP_PREFIX}-scroll`

  static width = ref(parseInt(sessionStorage.getItem(this.INDEX) || '-1')) as Ref<number>
  static disabled = computed(() => this.width.value < 8) as ComputedRef<boolean>
  static calculate = false as boolean

  private eventBorder?: EventItem
  private borderTop = ref(false) as Ref<boolean>
  private borderBottom = ref(false) as Ref<boolean>

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.getConstructor<typeof ScrollbarComponentAbstract>().think()

    watchEffect(() => this.initBorder())
  }

  setup (): ScrollbarSetupType {
    const classes = this.getClasses({
      main: {
        'is-bottom': this.borderBottom,
        'is-top': this.borderTop,
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

  private initBorder (): this {
    console.log('initBorder', this.element.value)

    if (this.element.value) {
      if (this.refs.border.value) {
        this.borderGo()
      } else {
        this.borderStop()
      }
    }

    return this
  }

  private borderGo (): this {
    if (this.eventBorder) {
      this.eventBorder.go()
    } else {
      this.eventBorder = new EventItem<any, Event>(this.element as Ref<HTMLElement>, () => this.setBorderPositions())
        .setType(['scroll'])
        .go()

      this.setBorderPositions()
    }

    return this
  }

  private borderStop (): this {
    if (this.eventBorder) {
      this.eventBorder.stop()
    }

    return this
  }

  private setBorderPositions () {
    const element = this.element.value

    if (element) {
      this.borderTop.value = element.scrollTop > 8
      this.borderBottom.value = element.scrollTop < element.scrollHeight - element.clientHeight - 8
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
