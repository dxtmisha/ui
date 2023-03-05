import { computed, Ref, ref } from 'vue'
import { WindowElements } from './WindowElements'
import { WindowOpen } from './WindowOpen'
import { WindowPersistent } from './WindowPersistent'

export class WindowVerification {
  private readonly target = ref() as Ref<HTMLElement | undefined>

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly elements: WindowElements,
    private readonly name: string,
    private readonly selector: string,
    private readonly open: WindowOpen,
    private readonly persistent: WindowPersistent,
    private readonly contextmenu?: Ref<boolean>,
    private readonly autoClose?: Ref<boolean>,
    private readonly disabled?: Ref<boolean>
  ) {
  }

  private readonly focus = computed(() => this.getTarget().closest(this.selector)) as Ref<HTMLElement>

  async is (target: HTMLElement) {
    this.target.value = target

    if (this.open.get()) {
      if (this.isContextmenu()) {
        await this.open.restart()
          .watchPosition()
      } else if (this.focus.value === null) {
        await this.open.toggle()
      } else if (!this.isFocus()) {
        if (this.isNotBlock()) {
          if (this.isChildren()) {
            requestAnimationFrame(async () => {
              if (
                ['open', 'flash'].indexOf(this.focus.value?.dataset.status || '') === -1
              ) {
                await this.open.toggle()
              }
            })
          } else {
            await this.open.toggle()
          }
        }
      } else if (this.isTarget()) {
        if (!this.persistent.on()) {
          await this.open.toggle()
        }
      } else if (
        this.isClose() ||
        this.isAutoClose() ||
        !this.isChildren()
      ) {
        await this.open.toggle()
      }
    } else if (this.isEnabled()) {
      await this.open.toggle()
    }
  }

  private getTarget<R = Element> (): R {
    return (this.target.value || this.element.value || document.body) as R
  }

  private isFocus (): boolean {
    return this.element.value === this.focus.value
  }

  private isTarget (): boolean {
    return this.element.value === this.target.value
  }

  private isEnabled (): boolean {
    return !this.disabled?.value && !this.getTarget().closest(this.elements.getByStatus('controlStatic'))
  }

  private isAutoClose (): boolean {
    return !!this.autoClose?.value &&
      !this.getTarget().closest(`${this.elements.getByStatus('static')}, .${this.elements.getId()} .${this.elements.getClassControl()}`)
  }

  private isContextmenu (): boolean {
    return !!this.contextmenu?.value &&
      !!this.getTarget().closest(`.${this.elements.getId()}.${this.elements.getClassControl()}`)
  }

  private isClose (): boolean {
    return !!this.getTarget().closest(`${this.elements.getByStatus('close')}:not(${this.elements.getByStatus('static')})`)
  }

  private isChildren (target = this.getTarget() as Element): boolean {
    const focus = target.closest<HTMLElement>(this.selector)
    return focus !== null && (focus.dataset.window === this.elements.getId() || this.isChildren(this.findControl(focus)))
  }

  private isNotBlock () {
    return !this.getTarget().classList.contains(this.name) &&
      !this.findControl(this.focus.value)?.closest(this.elements.getByStatus('block'))
  }

  private findControl (focus?: HTMLElement): Element | undefined {
    return document.querySelector(`.${this.elements.getClassControl()}.${focus?.dataset.window}`) || undefined
  }
}
