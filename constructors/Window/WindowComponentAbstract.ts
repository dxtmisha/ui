import { computed, ComputedRef, nextTick, onUnmounted, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { EventItem } from '../../classes/EventItem'
import { getIdElement } from '../../functions'
import { props } from './props'
import {
  AssociativeType,
  ComponentBaseType,
  ComponentClassesType
} from '../types'

export type WindowClassicType = ComponentClassesType & {
  body: string
  control: string
  context: string
}

export type WindowClassicControlType = {
  [key: string]: string
  block: string
  close: string
  controlStatic: string
  static: string
}

export type WindowStatusType = 'preparation' | 'open' | 'hide' | 'close'

export type WindowSetupType = ComponentBaseType & {
  classes: ComputedRef<WindowClassicType>
  id: string
  open: Ref<boolean>
  status: Ref<WindowStatusType>
  ifOpen: ComputedRef<boolean>
  toggle: (value: boolean) => void
  on: AssociativeType<(event: MouseEvent) => void>
  onAnimation: () => void
  onTransition: () => void
}

export abstract class WindowComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-window', 'on-open', 'on-close'] as string[]

  static readonly CLASSES = {
    block: 'window-block',
    close: 'window-close',
    controlStatic: 'window-control-static',
    static: 'window-static'
  } as WindowClassicControlType

  private readonly id: string
  private readonly open: Ref<boolean>
  private readonly persistent: Ref<boolean>
  private eventStatus: EventItem

  private readonly openFirst = ref(false) as Ref<boolean>
  private readonly status = ref('close') as Ref<WindowStatusType>
  private readonly target = ref() as Ref<HTMLElement | undefined>
  private readonly focus = computed(() => this.getTarget().closest(this.getSelector())) as Ref<HTMLElement>

  private client = {
    x: 0 as number,
    y: 0 as number
  }

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.id = `window--id--${getIdElement()}`
    this.open = ref(false)
    this.persistent = ref(false)
    this.eventStatus = new EventItem<void>(document.body, async (event) => this.callbackStatus(event))
      .setDom(this.element)

    onUnmounted(() => {
      this.eventStatus.stop()
    })
  }

  setup (): WindowSetupType {
    const classes = this.getClasses<WindowClassicType>({
      main: {
        [this.id]: true,
        'is-persistent': this.persistent
      },
      control: { [this.id]: true }
    })
    const styles = this.getStyles()

    return {
      ...this.getBasic(),
      classes,
      styles,
      id: this.id,
      open: this.open,
      status: this.status,
      ifOpen: this.ifOpen,
      toggle: (value = true as boolean) => this.toggle(value),
      on: {
        click: (event: MouseEvent) => this.onClick(event),
        contextmenu: (event: MouseEvent) => this.onContextmenu(event)
      },
      onAnimation: () => this.onAnimation(),
      onTransition: () => this.onTransition()
    }
  }

  private readonly ifOpen = computed(() => this.open.value || (this.openFirst.value && this.props.inDom)) as ComputedRef<boolean>

  private async callbackStatus (event?: Event): Promise<void> {
    if (this.open.value) {
      await this.verification(event?.target as HTMLElement)
    } else {
      this.eventStatus.stop()
    }
  }

  private async emitStatus () {
    const toOpen = !this.open.value

    if (
      !this.props.beforeOpening ||
      await this.props.beforeOpening(toOpen)
    ) {
      if (toOpen) {
        this.setStatus('preparation')
        this.open.value = toOpen
        this.openFirst.value = toOpen

        await nextTick()
        // watchPosition()

        requestAnimationFrame(() => {
          this.setStatus('open')
          this.eventStatus.go()
          // emitOpening(toOpen)
        })
      } else {
        this.setStatus('hide')
        this.eventStatus.stop()
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

  private findControl (focus?: HTMLElement): Element | undefined {
    return document.querySelector(`.${this.getControlName()}.${focus?.dataset.window}`) || undefined
  }

  private getClassicControl (name: keyof WindowClassicControlType): string {
    return (this.constructor as typeof WindowComponentAbstract).CLASSES?.[name] || ''
  }

  private getControlName (): string {
    return this.getItem().getClassName(['control'])
  }

  private getTarget<R = Element> (): R {
    return (this.target.value || this.element.value || document.body) as R
  }

  private async go (event: MouseEvent): Promise<void> {
    this.client.x = event.clientX
    this.client.y = event.clientY

    await this.verification(event.target as HTMLElement)
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
    return this.props.autoClose &&
      !this.getTarget().classList.contains(this.getName()) &&
      !this.findControl(this.focus.value)?.closest(this.selectorIsStatus('block'))
  }

  private selectorIsStatus (name: keyof WindowClassicControlType) {
    return `.${this.id} .${this.getClassicControl(name)}`
  }

  private setStatus (value: WindowStatusType): this {
    this.status.value = value

    return this
  }

  async toggle (value = true as boolean) {
    if (this.open.value !== value) {
      await this.emitStatus()
    }
  }

  async verification (target: HTMLElement) {
    this.target.value = target

    if (this.open.value) {
      if (this.focus.value === null) {
        await this.emitStatus()
      } else if (!this.ifElementIsFocus()) {
        if (this.ifNotBlock()) {
          if (this.ifChildren()) {
            requestAnimationFrame(async () => {
              if (this.focus.value?.dataset.status !== 'open') {
                await this.emitStatus()
              }
            })
          } else {
            await this.emitStatus()
          }
        }
      } else if (this.ifElementIsTarget()) {
        if (this.props.persistent) {
          this.persistent.value = true
        } else {
          await this.emitStatus()
        }
      } else if (this.ifClose() || this.ifAutoClose()) {
        await this.emitStatus()
      }
    } else if (this.ifDisabled()) {
      await this.emitStatus()
    }
  }

  private async onClick (event: MouseEvent) {
    if (!this.props.contextmenu) {
      await this.go(event)
    }
  }

  private async onContextmenu (event: MouseEvent) {
    if (this.props.contextmenu) {
      event.preventDefault()
      event.stopPropagation()

      await this.go(event)
    }
  }

  private onAnimation (): void {
    if (this.persistent.value) {
      this.persistent.value = false
    }
  }

  private onTransition (): void {
    if (this.status.value === 'hide') {
      this.open.value = false
      this.setStatus('close')
    }
  }
}
