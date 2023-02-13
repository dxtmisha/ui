import { computed, onUnmounted, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { EventItem } from '../../classes/EventItem'
import { props } from './props'
import { AssociativeType } from '../types'
import {
  WindowClassesType,
  WindowSetupType
} from './types'
import { WindowElements } from './WindowElements'
import { WindowCoordinates } from './WindowCoordinates'
import { WindowClient } from './WindowClient'
import { WindowPosition } from './WindowPosition'
import { WindowOrigin } from './WindowOrigin'
import { WindowPersistent } from './WindowPersistent'
import { WindowStatus } from './WindowStatus'
import { WindowOpen } from './WindowOpen'
import { WindowEvent } from './WindowEvent'

export abstract class WindowComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-window', 'on-open', 'on-close'] as string[]

  private readonly eventItem: EventItem

  private readonly status: WindowStatus
  private readonly elements: WindowElements
  private readonly coordinates: WindowCoordinates
  private readonly client: WindowClient

  private readonly position: WindowPosition
  private readonly origin: WindowOrigin

  private readonly persistent: WindowPersistent

  private readonly open: WindowOpen
  private readonly event: WindowEvent

  private readonly target = ref() as Ref<HTMLElement | undefined>
  private readonly focus = computed(() => this.getTarget().closest(this.getSelector())) as Ref<HTMLElement>

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    const styleName = this.getStyleName()

    this.eventItem = new EventItem<void>(
      document.body,
      async (event) => this.callbackStatus(event)
    )
      .setDom(this.element)

    this.status = new WindowStatus()
    this.elements = new WindowElements(
      this.getItem(),
      this.status
    )
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

    this.persistent = new WindowPersistent(this.refs.persistent)

    this.open = new WindowOpen(
      this.element,
      this.status,
      this.coordinates,
      this.position,
      this.origin,
      this.eventItem,
      this.refs.inDom,
      this.refs.beforeOpening,
      this.refs.opening
    )

    this.event = new WindowEvent(
      this.context.emit,
      this.element,
      this.elements,
      this.open
    )

    onUnmounted(() => {
      this.eventItem.stop()
    })
  }

  setup (): WindowSetupType {
    const classes = this.getClasses<WindowClassesType>({
      main: {
        ...this.elements.getClass(),
        ...this.persistent.getClass()
      },
      control: this.elements.getClass()
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
      open: this.open.item,
      status: this.status.item,
      isOpen: this.open.is,
      toggle: (value = true as boolean) => this.open.set(value),
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

  private async callbackStatus (event?: Event): Promise<void> {
    if (this.open.get()) {
      await this.verification(event?.target as HTMLElement)
    } else {
      this.eventItem.stop()
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

  async verification (target: HTMLElement) {
    this.target.value = target

    if (this.open.get()) {
      if (this.focus.value === null) {
        await this.open.toggle()
      } else if (!this.ifElementIsFocus()) {
        if (this.ifNotBlock()) {
          if (this.ifChildren()) {
            requestAnimationFrame(async () => {
              if (this.focus.value?.dataset.status !== 'open') {
                await this.open.toggle()
              }
            })
          } else {
            await this.open.toggle()
          }
        }
      } else if (this.ifElementIsTarget()) {
        if (!this.persistent.on()) {
          await this.open.toggle()
        }
      } else if (
        this.ifClose() ||
        this.ifAutoClose() ||
        !this.ifChildren()
      ) {
        await this.open.toggle()
      }
    } else if (this.ifDisabled()) {
      await this.open.toggle()
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
    this.persistent.disabled()
  }

  private async onTransition (): Promise<void> {
    await this.open.close()
  }
}
