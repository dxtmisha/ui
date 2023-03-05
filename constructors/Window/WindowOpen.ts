import { computed, nextTick, Ref, ref } from 'vue'
import { EventItem } from '../../classes/EventItem'
import { frame } from '../../functions'

import { WindowCoordinates } from './WindowCoordinates'
import { WindowFlash } from './WindowFlash'
import { WindowOrigin } from './WindowOrigin'
import { WindowPosition } from './WindowPosition'
import { WindowStatus } from './WindowStatus'

export class WindowOpen {
  readonly item = ref<boolean>(false)
  private readonly first = ref<boolean>(false)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly status: WindowStatus,
    private readonly coordinates: WindowCoordinates,
    private readonly position: WindowPosition,
    private readonly origin: WindowOrigin,
    private readonly flash: WindowFlash,
    private readonly eventItem: EventItem,
    private readonly inDom?: Ref<boolean>,
    private readonly beforeOpening?: Ref<(status: boolean) => boolean>,
    private readonly preparation?: Ref<(status: boolean) => void>,
    private readonly opening?: Ref<(status: boolean) => boolean>
  ) {
  }

  readonly is = computed<boolean>(() => this.item.value || (this.first.value && !!this.inDom?.value))

  get () {
    return this.item.value
  }

  async set (value = true as boolean): Promise<this> {
    if (this.item.value !== value) {
      await this.toggle()
    }

    return this
  }

  async close (): Promise<boolean> {
    if (this.status.isHide()) {
      return this.toClose()
    } else {
      return false
    }
  }

  async toggle (): Promise<this> {
    if (await this.callbackBeforeOpening()) {
      const toOpen = !this.item.value

      if (toOpen) {
        this.restart()
        this.status.set('preparation')
        this.item.value = toOpen
        this.first.value = toOpen

        await nextTick()
        await this.callbackPreparation()
        await this.watchPosition()

        requestAnimationFrame(async () => {
          await this.callbackOpening()

          this.eventItem.go()
          this.status.set(this.flash.isHide() ? 'flash' : 'open')
        })
      } else {
        this.eventItem.stop()

        if (this.flash.isOpen()) {
          await this.toClose()
        } else {
          this.status.set('hide')
        }
      }
    }

    return this
  }

  async watchPosition () {
    if (
      this.element.value &&
      this.item.value
    ) {
      this.position.update()
      this.origin.update()
      this.watchCoordinates()
    } else {
      this.restart()
    }
  }

  restart (): this {
    this.coordinates.restart()
    this.origin.restart()

    return this
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
      () => this.item.value && !this.status.isHide()
    )

    return this
  }

  private async toClose (): Promise<boolean> {
    setTimeout(() => {
      this.item.value = false
    }, 50)

    this.status.set('close')
    return await this.callbackOpening()
  }

  private async callbackBeforeOpening (): Promise<boolean> {
    if (this.beforeOpening?.value) {
      return await this.beforeOpening.value(!this.item.value)
    } else {
      return true
    }
  }

  private async callbackPreparation (): Promise<void> {
    if (this.preparation?.value) {
      await this.preparation.value(this.item.value)
      await nextTick()
    }
  }

  private async callbackOpening (): Promise<boolean> {
    if (this.opening?.value) {
      return await this.opening.value(this.item.value)
    } else {
      return false
    }
  }
}
