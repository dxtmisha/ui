import { nextTick, Ref } from 'vue'

/**
 * A class for working with hooks when opening and closing a window
 *
 * Класс для работы с хуками при открытии и закрытии окна
 */
export class WindowHook {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly beforeOpening?: Ref<(status: boolean) => boolean>,
    private readonly preparation?: Ref<(status: boolean) => void>,
    private readonly opening?: Ref<(status: boolean) => boolean>
  ) {
  }

  /**
   * Hook before opening/closing
   *
   * Хук перед открытием/закрытием
   * @param open current state of the window / текущее состояние окна
   */
  async callbackBeforeOpening (open: boolean): Promise<boolean> {
    if (this.beforeOpening?.value) {
      return await this.beforeOpening.value(!open)
    } else {
      return true
    }
  }

  /**
   * Hook for preparing elements before opening/closing
   *
   * Хук для подготовки элементов перед открытием/закрытием
   * @param open current state of the window / текущее состояние окна
   */
  async callbackPreparation (open: boolean): Promise<void> {
    if (this.preparation?.value) {
      await this.preparation.value(open)
      await nextTick()
    }
  }

  /**
   * Hook after opening/closing
   *
   * Хук после открытия/закрытия
   * @param open current state of the window / текущее состояние окна
   */
  async callbackOpening (open: boolean): Promise<boolean> {
    if (this.opening?.value) {
      return await this.opening.value(open)
    } else {
      return false
    }
  }
}
