import { computed, nextTick, Ref, ref } from 'vue'
import { EventItem } from '../../classes/EventItem'
import { frame } from '../../functions/element'

import { WindowCoordinates } from './WindowCoordinates'
import { WindowFlash } from './WindowFlash'
import { WindowHook } from './WindowHook'
import { WindowOrigin } from './WindowOrigin'
import { WindowPosition } from './WindowPosition'
import { WindowStatus } from './WindowStatus'

/**
 * A class for managing the state of the window. And also the actions that need
 * to be performed when changing the state of the window
 *
 * Класс управления состоянием окна. А также действия, необходимые выполнить при
 * изменении состояния окна
 */
export class WindowOpen {
  /**
   * Window state values
   *
   * Значения состояния окна
   */
  readonly item = ref<boolean>(false)

  /**
   * Values store information about the first opening of the window. This is needed
   * for the window to be saved in the DOM if the inDom property is true
   *
   * Значения хранят информацию о первом открытии окна. Это нужно, чтобы окно
   * сохранилось в DOM, если свойство inDom = true
   * @protected
   */
  protected readonly first = ref<boolean>(false)

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly element: Ref<HTMLDivElement | undefined>,
    protected readonly status: WindowStatus,
    protected readonly coordinates: WindowCoordinates,
    protected readonly position: WindowPosition,
    protected readonly origin: WindowOrigin,
    protected readonly flash: WindowFlash,
    protected readonly eventItem: EventItem,
    protected readonly hook: WindowHook,
    protected readonly inDom?: Ref<boolean>
  ) {
  }

  /**
   * A value that indicates that the window should be kept in the DOM
   *
   * Значение, указывающее, что окно надо оставить в DOM
   */
  readonly is = computed<boolean>(() => this.item.value || (this.first.value && !!this.inDom?.value))

  /**
   * Returns the current state
   *
   * Возвращает текущее состояние
   */
  get () {
    return this.item.value
  }

  /**
   * Changes the current state
   *
   * Изменяет текущее состояние
   * @param value the value of the current state / значение текущего состояния
   */
  async set (value = true as boolean): Promise<this> {
    if (this.item.value !== value) {
      await this.toggle()
    }

    return this
  }

  /**
   * Switches the state, that is, opens or closes the window, depending on the value of item
   *
   * Переключает состояние, то есть открывает или закрывает окно, в зависимости от значения item
   */
  async toggle (): Promise<this> {
    if (await this.hook.callbackBeforeOpening(this.item.value)) {
      const toOpen = !this.item.value

      if (toOpen) {
        this.restart()
        this.status.set('preparation')
        this.item.value = toOpen
        this.first.value = toOpen

        await nextTick()
        await this.hook.callbackPreparation(this.item.value)
        await this.watchPosition()

        requestAnimationFrame(async () => {
          await this.hook.callbackOpening(this.item.value)

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

  /**
   * The method closes the window
   *
   * Метод закрывает окно
   */
  async close (): Promise<boolean> {
    if (this.status.isHide()) {
      return this.toClose()
    } else {
      return false
    }
  }

  /**
   * The method updates the current position
   *
   * Метод обновляет текущее положение
   */
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

  /**
   * The method resets all knowledge
   *
   * Метод сбрасывает все знания
   */
  restart (): this {
    this.coordinates.restart()
    this.origin.restart()

    return this
  }

  /**
   * Changing the location of the menu window
   *
   * Изменение расположения окна меню
   * @private
   */
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

  /**
   * Transition to the closing state
   *
   * Переход в состояние закрытия
   * @private
   */
  private async toClose (): Promise<boolean> {
    setTimeout(() => {
      this.item.value = false
    }, 50)

    this.status.set('close')
    return await this.hook.callbackOpening(this.item.value) || false
  }
}
