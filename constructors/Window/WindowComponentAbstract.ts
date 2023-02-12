import { computed, ComputedRef, nextTick, onUnmounted, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { EventItem } from '../../classes/EventItem'
import { frame } from '../../functions'
import { props } from './props'
import { AssociativeType } from '../types'
import {
  WindowClassesType,
  WindowEmitType,
  WindowSetupType,
  WindowStatusType
} from './types'
import { WindowElements } from './WindowElements'
import { WindowCoordinates } from './WindowCoordinates'
import { WindowClient } from './WindowClient'
import { WindowPosition } from './WindowPosition'
import { WindowOrigin } from './WindowOrigin'

export abstract class WindowComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-window', 'on-open', 'on-close'] as string[]

  private readonly elements: WindowElements
  private readonly coordinates: WindowCoordinates
  private readonly client: WindowClient

  private readonly position: WindowPosition
  private readonly origin: WindowOrigin

  private readonly open: Ref<boolean>
  private readonly persistent: Ref<boolean>
  private eventStatus: EventItem

  private readonly openFirst = ref(false) as Ref<boolean>
  private readonly status = ref('close') as Ref<WindowStatusType>
  private readonly target = ref() as Ref<HTMLElement | undefined>
  private readonly focus = computed(() => this.getTarget().closest(this.getSelector())) as Ref<HTMLElement>

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    const styleName = this.getStyleName()

    this.elements = new WindowElements(this.getItem())
    this.coordinates = new WindowCoordinates(
      this.element,
      this.elements
    )
    this.client = new WindowClient()

    this.position = new WindowPosition(
      this.element,
      this.coordinates,
      this.client,
      styleName,
      this.refs.axis,
      this.refs.indent,
      this.refs.contextmenu
    )

    this.origin = new WindowOrigin(
      this.element,
      this.elements,
      this.client,
      this.position,
      styleName
    )

    this.open = ref(false)
    this.persistent = ref(false)
    this.eventStatus = new EventItem<void>(document.body, async (event) => this.callbackStatus(event))
      .setDom(this.element)

    onUnmounted(() => {
      this.eventStatus.stop()
    })
  }

  setup (): WindowSetupType {
    const classes = this.getClasses<WindowClassesType>({
      main: {
        [this.elements.getId()]: true,
        'is-persistent': this.persistent
      },
      control: { [this.elements.getId()]: true }
    })

    const styles = this.getStyles({
      main: {
        ...this.origin.getStyle(),
        ...this.position.getStyle()
      }
    })

    return {
      ...this.getBasic(),
      classes,
      styles,
      id: this.elements.getId(),
      open: this.open,
      status: this.status,
      isOpen: this.isOpen,
      toggle: (value = true as boolean) => this.toggle(value),
      on: {
        click: (event: MouseEvent & TouchEvent) => this.onClick(event),
        contextmenu: (event: MouseEvent & TouchEvent) => this.onContextmenu(event)
      },
      onAnimation: () => this.onAnimation(),
      onTransition: () => this.onTransition()
    }
  }

  getStyleName (): string {
    return `--${this.getItem().getBasicClassName()}-`
  }

  private readonly isOpen = computed(() => this.open.value || (this.openFirst.value && this.props.inDom)) as ComputedRef<boolean>

  private callbackOpening () {
    if (this.props.opening) {
      this.props.opening(this.open.value)
    }
  }

  private async callbackStatus (event?: Event): Promise<void> {
    if (this.open.value) {
      await this.verification(event?.target as HTMLElement)
    } else {
      this.eventStatus.stop()
    }
  }

  private emitWindow (options: WindowEmitType) {
    this.context.emit('on-window', options)
    this.context.emit(options.open ? 'on-open' : 'on-close', options)
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
        await this.watchPosition()

        requestAnimationFrame(() => {
          this.setStatus('open')
          this.eventStatus.go()
          this.callbackOpening()
        })
      } else {
        this.setStatus('hide')
        this.eventStatus.stop()
      }

      this.emitWindow({
        open: toOpen,
        element: this.element.value,
        control: this.elements.getControl(),
        id: this.elements.getId()
      })
    }
  }

  private findControl (focus?: HTMLElement): Element | undefined {
    return document.querySelector(`.${this.elements.getClassControl()}.${focus?.dataset.window}`) || undefined
  }

  private getTarget<R = Element> (): R {
    return (this.target.value || this.element.value || document.body) as R
  }

  private async go (event: MouseEvent & TouchEvent): Promise<void> {
    this.client.set(
      EventItem.clientX(event),
      EventItem.clientY(event)
    )

    await this.verification(event.target as HTMLElement)
  }

  private ifAutoClose (): boolean {
    return this.props.autoClose &&
      !this.getTarget().closest(`${this.elements.getByStatus('static')}, .${this.elements.getId()} .${this.elements.getClassControl()}`)
  }

  private ifChildren (target = this.getTarget() as Element): boolean {
    const focus = target.closest<HTMLElement>(this.getSelector())

    return focus !== null && (focus.dataset.window === this.elements.getId() || this.ifChildren(this.findControl(focus)))
  }

  private ifClose (): boolean {
    return !!this.getTarget().closest(`${this.elements.getByStatus('close')}:not(${this.elements.getByStatus('static')})`)
  }

  private ifDisabled (): boolean {
    return !this.props.disabled && !this.getTarget().closest(this.elements.getByStatus('controlStatic'))
  }

  private ifElementIsFocus (): boolean {
    return this.element.value === this.focus.value
  }

  private ifElementIsTarget (): boolean {
    return this.element.value === this.target.value
  }

  private ifNotBlock () {
    return !this.getTarget().classList.contains(this.getName()) &&
      !this.findControl(this.focus.value)?.closest(this.elements.getByStatus('block'))
  }

  private restart (): this {
    this.coordinates.restart()
    this.origin.restart()

    return this
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
      } else if (
        this.ifClose() ||
        this.ifAutoClose() ||
        !this.ifChildren()
      ) {
        await this.emitStatus()
      }
    } else if (this.ifDisabled()) {
      await this.emitStatus()
    }
  }

  private watchCoordinates (): this {
    frame(
      () => {
        if (
          this.element.value &&
          getComputedStyle(this.element.value).content === '"--MENU--"'
        ) {
          this.position.update()
        }
      },
      () => this.open.value
    )

    return this
  }

  private async watchPosition () {
    if (
      this.element.value &&
      this.open.value
    ) {
      this.position.update()
      this.origin.update()
      this.watchCoordinates()
    } else {
      this.restart()
    }
  }

  private async onClick (event: MouseEvent & TouchEvent) {
    if (!this.props.contextmenu) {
      await this.go(event)
    }
  }

  private async onContextmenu (event: MouseEvent & TouchEvent) {
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
      this.callbackOpening()
    }
  }
}
