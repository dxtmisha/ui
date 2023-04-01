import { onUnmounted } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { EventItem } from '../../classes/EventItem'
import { props } from './props'

import { WindowClient } from './WindowClient'
import { WindowCoordinates } from './WindowCoordinates'
import { WindowElements } from './WindowElements'
import { WindowEvent } from './WindowEvent'
import { WindowFlash } from './WindowFlash'
import { WindowHook } from './WindowHook'
import { WindowOpen } from './WindowOpen'
import { WindowOrigin } from './WindowOrigin'
import { WindowPersistent } from './WindowPersistent'
import { WindowPosition } from './WindowPosition'
import { WindowStatus } from './WindowStatus'
import { WindowVerification } from './WindowVerification'

import { AssociativeType } from '../types'
import {
  WindowClassesType,
  WindowSetupType
} from './types'

/**
 * The window component is a basic component for working with various elements
 * related to pop-up windows. For example, windows, modal windows or menus.
 *
 * Компонент window - это базовый компонент для работы с различными элементами,
 * связанными с всплывающими окнами. Например, окна, модальные окна или меню.
 */
export abstract class WindowComponentAbstract extends ComponentAbstract<HTMLDivElement> {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-window', 'on-open', 'on-close'] as string[]

  protected readonly stylesProps = [
    'height',
    'indent',
    'rounded',
    'width'
  ] as string[]

  /**
   * События для контрол состояния окно
   * @private
   */
  private readonly eventItem: EventItem

  private readonly status: WindowStatus
  private readonly elements: WindowElements
  private readonly coordinates: WindowCoordinates
  private readonly client: WindowClient

  private readonly position: WindowPosition
  private readonly origin: WindowOrigin

  private readonly persistent: WindowPersistent

  private readonly hook: WindowHook
  private readonly flash: WindowFlash
  private readonly open: WindowOpen
  private readonly verification: WindowVerification
  private readonly event: WindowEvent

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    const styleName = this.getStyleName()

    this.eventItem = new EventItem<void>(
      document.body,
      async (event) => this.eventCallback(event)
    )
      .setType(['click', 'contextmenu'])
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
      this.refs?.axis,
      this.refs?.indent,
      this.refs?.contextmenu
    )

    this.origin = new WindowOrigin(
      this.element,
      this.elements,
      this.client,
      this.position,
      styleName
    )

    this.persistent = new WindowPersistent(this.refs?.persistent)

    this.hook = new WindowHook(
      this.refs?.beforeOpening,
      this.refs?.preparation,
      this.refs?.opening
    )
    this.flash = new WindowFlash(
      this.elements,
      this.refs?.flash
    )
    this.open = new WindowOpen(
      this.element,
      this.status,
      this.coordinates,
      this.position,
      this.origin,
      this.flash,
      this.eventItem,
      this.hook,
      this.refs?.inDom
    )

    this.verification = new WindowVerification(
      this.element,
      this.elements,
      this.getName(),
      this.getSelector(),
      this.open,
      this.persistent,
      this.refs?.contextmenu,
      this.refs?.autoClose,
      this.refs?.disabled
    )

    this.event = new WindowEvent(
      this.context.emit,
      this.element,
      this.elements,
      this.open
    )

    onUnmounted(() => this.eventItem.stop())
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
      onAnimation: () => this.persistent.disabled(),
      onTransition: async () => await this.open.close()
    }
  }

  /**
   * Callback события при нажатия на любой обоасти для провепка и
   * изменения состояния открытия
   * @param event экземпляр события
   * @private
   */
  private async eventCallback (event?: Event): Promise<void> {
    if (this.open.get()) {
      this.flash.setControl(event?.target as HTMLElement)
      await this.verification.is(event?.target as HTMLElement)
    } else {
      this.eventItem.stop()
    }
  }

  private async on (event: MouseEvent & TouchEvent): Promise<void> {
    this.client.set(
      EventItem.clientX(event),
      EventItem.clientY(event)
    )

    await this.verification.is(event.target as HTMLElement)
  }

  private async onClick (event: MouseEvent & TouchEvent) {
    if (!this.props?.contextmenu) {
      await this.on(event)
    }
  }

  private async onContextmenu (event: MouseEvent & TouchEvent) {
    if (this.props?.contextmenu) {
      event.preventDefault()

      await this.on(event)
    }
  }
}
