import { computed, ComputedRef, nextTick, onUnmounted, Ref, ref } from 'vue'
import { ComponentAbstract } from '../../classes/ComponentAbstract'
import { EventItem } from '../../classes/EventItem'
import { frame } from '../../functions'
import { props } from './props'
import { AssociativeType } from '../types'
import {
  WindowClassicControlType,
  WindowClassicType,
  WindowClientType,
  WindowCoordinatesType,
  WindowEmitType,
  WindowSetupType,
  WindowStatusType
} from './types'
import { WindowElements } from './WindowElements'

export abstract class WindowComponentAbstract extends ComponentAbstract {
  static readonly instruction = props as AssociativeType
  static readonly emits = ['on-window', 'on-open', 'on-close'] as string[]

  static readonly CLASSES = {
    block: 'window-block',
    close: 'window-close',
    controlStatic: 'window-control-static',
    static: 'window-static'
  } as WindowClassicControlType

  private readonly elements: WindowElements

  private readonly open: Ref<boolean>
  private readonly persistent: Ref<boolean>
  private eventStatus: EventItem

  private readonly openFirst = ref(false) as Ref<boolean>
  private readonly status = ref('close') as Ref<WindowStatusType>
  private readonly target = ref() as Ref<HTMLElement | undefined>
  private readonly focus = computed(() => this.getTarget().closest(this.getSelector())) as Ref<HTMLElement>

  private readonly coordinates = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0
  } as WindowCoordinatesType

  private readonly client = {
    x: 0,
    y: 0
  } as WindowClientType

  private readonly positionX = ref(0) as Ref<number>
  private readonly positionY = ref(0) as Ref<number>

  private readonly originX = ref(null) as Ref<number | null>
  private readonly originY = ref(null) as Ref<number | null>

  constructor (
    protected readonly props: AssociativeType & object,
    protected readonly context: AssociativeType & object
  ) {
    super(props, context)

    this.elements = new WindowElements(
      this.getItem()
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
    const stylePrefix = `--${this.getItem().getBasicClassName()}-`

    const classes = this.getClasses<WindowClassicType>({
      main: {
        [this.elements.getId()]: true,
        'is-persistent': this.persistent
      },
      control: { [this.elements.getId()]: true }
    })
    const styles = this.getStyles({
      main: {
        [`${stylePrefix}origin-x`]: this.styleOriginX,
        [`${stylePrefix}origin-y`]: this.styleOriginY,
        [`${stylePrefix}inset-x`]: this.styleInsetX,
        [`${stylePrefix}inset-y`]: this.styleInsetY
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

  private readonly isOpen = computed(() => this.open.value || (this.openFirst.value && this.props.inDom)) as ComputedRef<boolean>

  private readonly styleOriginX = computed(() => this.originX.value !== null ? `${this.originX.value}px` : 'center') as ComputedRef<string>
  private readonly styleOriginY = computed(() => this.originY.value !== null ? `${this.originY.value}px` : 'center') as ComputedRef<string>
  private readonly styleInsetX = computed(() => `${this.positionX.value}px`) as ComputedRef<string>
  private readonly styleInsetY = computed(() => `${this.positionY.value}px`) as ComputedRef<string>

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

  private getClassicControl (name: keyof WindowClassicControlType): string {
    return (this.constructor as typeof WindowComponentAbstract).CLASSES?.[name] || ''
  }

  private getTarget<R = Element> (): R {
    return (this.target.value || this.element.value || document.body) as R
  }

  private async go (event: MouseEvent & TouchEvent): Promise<void> {
    this.client.x = EventItem.clientX(event)
    this.client.y = EventItem.clientY(event)

    await this.verification(event.target as HTMLElement)
  }

  private ifAutoClose (): boolean {
    return this.props.autoClose &&
      !this.getTarget().closest(`${this.selectorIsStatus('static')}, .${this.elements.getId()} .${this.elements.getClassControl()}`)
  }

  private ifChildren (target = this.getTarget() as Element): boolean {
    const focus = target.closest<HTMLElement>(this.getSelector())

    return focus !== null && (focus.dataset.window === this.elements.getId() || this.ifChildren(this.findControl(focus)))
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

  private restart (): this {
    this.coordinates.top = 0
    this.coordinates.right = 0
    this.coordinates.bottom = 0
    this.coordinates.left = 0
    this.coordinates.width = 0
    this.coordinates.height = 0

    this.originX.value = null
    this.originY.value = null

    return this
  }

  private selectorIsStatus (name: keyof WindowClassicControlType) {
    return `.${this.elements.getId()} .${this.getClassicControl(name)}`
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

  private updateCoordinates (): this {
    const rect = this.elements.getRect()

    if (
      this.element.value &&
      rect && (
        this.coordinates.top !== rect.top ||
        this.coordinates.right !== rect.right ||
        this.coordinates.bottom !== rect.bottom ||
        this.coordinates.left !== rect.left ||
        this.coordinates.width !== this.element.value.offsetWidth ||
        this.coordinates.height !== this.element.value.offsetHeight
      )
    ) {
      this.coordinates.top = rect.top
      this.coordinates.right = rect.right
      this.coordinates.bottom = rect.bottom
      this.coordinates.left = rect.left
      this.coordinates.width = this.element.value.offsetWidth
      this.coordinates.height = this.element.value.offsetHeight

      this.updateX()
        .updateY()
    }

    return this
  }

  private updateOrigin (): this {
    if (
      this.element.value &&
      getComputedStyle(this.element.value).content !== '"--MENU--"'
    ) {
      const rect = this.elements.getBody()?.getBoundingClientRect()

      if (rect) {
        this.originX.value = this.client.x ? this.client.x - rect.left : null
        this.originY.value = this.client.y ? this.client.y - rect.top : null
      }
    } else {
      this.originX.value = this.client.x ? this.client.x - this.positionX.value : null
      this.originY.value = this.client.y ? this.client.y - this.positionY.value : null
    }

    return this
  }

  private updateX (): this {
    if (this.element.value) {
      const indent = this.props.axis === 'x' ? this.props.indent : 0
      const rectRight = this.props.contextmenu ? this.client.x : this.coordinates.right + indent
      const rectLeft = this.props.contextmenu ? this.client.x : this.coordinates.left - indent
      const argumentValues = [] as number[]

      if (this.props.axis === 'x') {
        argumentValues.push(rectRight, rectLeft)
      } else {
        argumentValues.push(rectLeft, rectRight)
      }

      this.positionX.value = this.getConstructor<typeof WindowComponentAbstract>().getInnerPosition(
        argumentValues[0],
        argumentValues[1],
        this.element.value.offsetWidth,
        window.innerWidth
      )
    }

    return this
  }

  private updateY (): this {
    if (this.element.value) {
      const indent = this.props.axis === 'y' ? this.props.indent : 0
      const rectTop = this.props.contextmenu ? this.client.y : this.coordinates.top - indent
      const rectBottom = this.props.contextmenu ? this.client.y : this.coordinates.bottom + indent
      const argumentValues = [] as number[]

      if (this.props.axis === 'y') {
        argumentValues.push(rectBottom, rectTop)
      } else {
        argumentValues.push(rectTop, rectBottom)
      }

      this.positionY.value = this.getConstructor<typeof WindowComponentAbstract>().getInnerPosition(
        argumentValues[0],
        argumentValues[1],
        this.element.value.offsetHeight,
        window.innerHeight
      )
    }

    return this
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
          this.updateCoordinates()
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
      this.updateCoordinates()
        .updateOrigin()
        .watchCoordinates()
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

  private static getInnerPosition (
    inValue: number,
    outValue: number,
    length: number,
    innerLength: number
  ): number {
    if (inValue + length <= innerLength) {
      return inValue
    } else if (outValue - length > 0) {
      return outValue - length
    } else {
      return 0
    }
  }
}
