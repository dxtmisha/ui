import { computed, nextTick, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { EventItem } from '../../classes/EventItem'
import { getIdElement } from '../../functions'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType
} from '../types'

export type WindowClassesType = {
  [key: string]: string
  block: string
  close: string
  controlStatic: string
  static: string
}

export type WindowSetupType = ComponentBaseType & {
  toggle: (value: boolean) => void
}

export abstract class WindowComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-window', 'on-open', 'on-close'] as string[]

  static readonly CLASSES = {
    block: 'window-block',
    close: 'window-close',
    controlStatic: 'window-control-static',
    static: 'window-static'
  } as WindowClassesType

  private readonly id: string
  private readonly open: Ref<boolean>
  private readonly persistent: Ref<boolean>
  private event: EventItem

  private target = ref() as Ref<HTMLElement | undefined>
  private focus = computed(() => this.getTarget().closest(this.getSelector())) as Ref<HTMLElement>

  private staticOpen = ref(false)
  private staticHide = ref(false)
  private staticClose = ref(false)

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.id = `w--${getIdElement()}`
    this.open = ref(false)
    this.persistent = ref(false)
    this.event = new EventItem<void>(document.body, async (event) => this.eventClose(event))
      .setDom(this.element)
  }

  setup (): WindowSetupType {
    const classes = this.getClasses({
      main: {}
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      toggle: (value = true as boolean) => this.toggle(value)
    }
  }

  findControl (focus?: HTMLElement): Element | undefined {
    return document.querySelector(`[data-window-control="${focus?.dataset.window}"]`) || undefined
  }

  private getControlName (): string {
    return this.getItem().getClassName(['control'])
  }

  private getStatus (name: keyof WindowClassesType): string {
    return (this.constructor as typeof WindowComponentAbstract).CLASSES?.[name] || ''
  }

  private getTarget<R = Element> (): R {
    return (this.target.value || this.element.value || document.body) as R
  }

  private ifAutoClose (): boolean {
    return this.props.autoClose &&
      !this.getTarget().closest(`${this.selectorIsStatus('static')}, .${this.id} .${this.getControlName()}`)
  }

  private ifChildren (target = this.getTarget() as Element): boolean {
    const focus = target.closest<HTMLElement>(this.getSelector())

    return focus !== null && (focus.dataset.window === this.id || this.ifChildren(this.findControl(focus)))
  }

  private ifClose (): boolean {
    return !!this.getTarget().closest(`${this.selectorIsStatus('close')}:not(${this.selectorIsStatus('static')})`)
  }

  private ifDisabled (): boolean {
    return !this.props.disabled && !this.getTarget().closest(this.selectorIsStatus('controlStatic'))
  }

  private ifElementIsFocus (): boolean {
    return this.element.value === this.focus.value
  }

  private ifElementIsTarget (): boolean {
    return this.element.value === this.target.value
  }

  private ifNotBlock () {
    return !this.getTarget().classList.contains(this.getName()) &&
      !this.findControl(this.focus.value)?.closest(this.selectorIsStatus('block'))
  }

  private selectorIsStatus (name: keyof WindowClassesType) {
    return `.${this.id} .${this.getStatus(name)}`
  }

  async emit () {
    const toOpen = !this.open.value

    if (!this.props.beforeOpening || await this.props.beforeOpening(toOpen)) {
      if (toOpen) {
        this.staticHide.value = false
        this.open.value = toOpen

        await nextTick()
        // watchPosition()

        requestAnimationFrame(() => {
          this.staticOpen.value = true

          this.event.go()
          // emitOpening(toOpen)
        })
      } else {
        this.staticHide.value = true
        this.staticOpen.value = false

        this.event.stop()
        // emitOpening(toOpen)

        // if (props.light) {
        // open.value = false
        // }
      }

      /*
      context.emit('on-open', {
        modal,
        open: toOpen
      })
      */
    }
  }

  async eventClose (event?: Event): Promise<void> {
    if (event && this.open.value) {
      await this.verification(event.target as HTMLElement)
    } else {
      this.event.stop()
    }
  }

  private getWindowConstructor () {
    return this.constructor as typeof WindowComponentAbstract
  }

  async toggle (value = true as boolean) {
    if (this.open.value !== value) {
      await this.emit()
    }
  }

  async verification (target: HTMLElement) {
    this.target.value = target

    if (this.open.value) {
      if (this.focus.value === null) {
        await this.emit()
      } else if (!this.ifElementIsFocus()) {
        if (this.ifNotBlock()) {
          if (this.ifChildren()) {
            requestAnimationFrame(async () => {
              if (!this.focus.value?.classList.contains('is-show')) {
                await this.emit()
              }
            })
          } else {
            await this.emit()
          }
        }
      } else if (this.ifElementIsTarget()) {
        if (this.props.persistent) {
          this.persistent.value = true
        } else {
          await this.emit()
        }
      } else if (this.ifClose() || this.ifAutoClose()) {
        await this.emit()
      }
    } else if (this.ifDisabled()) {
      await this.emit()
    }
  }
}
