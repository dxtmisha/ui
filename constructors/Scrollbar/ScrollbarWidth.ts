import { computed, ref } from 'vue'
import { createElement } from '../../functions'

export class ScrollbarWidth {
  static readonly INDEX = `${process.env.VUE_APP_PREFIX}-scroll`

  static readonly width = ref<number>(parseInt(sessionStorage.getItem(this.INDEX) || '-1'))
  static readonly disabled = computed<boolean>(() => this.width.value < 8)

  static calculate = false as boolean

  static think (): void {
    if (
      !this.calculate &&
      this.width.value === -1
    ) {
      this.init().then((width: number) => this.setWidth(width))
    }
  }

  private static init (): Promise<number> {
    return new Promise(resolve => {
      this.calculate = true
      const element = this.createElement()

      requestAnimationFrame(() => {
        resolve(element.offsetWidth - element.clientWidth)

        element.remove()
        this.calculate = false
      })
    })
  }

  private static setWidth (value: number): void {
    sessionStorage.setItem(this.INDEX, value.toString())
    this.width.value = value
  }

  private static createElement (): HTMLDivElement {
    return createElement<HTMLDivElement>(document.body, 'div', element => {
      element.style.height = '24px'
      element.style.overflowY = 'scroll'
      element.style.position = 'fixed'
      element.style.width = '100%'

      createElement(element, 'div', element => {
        element.style.height = '100px'
      })
    })
  }
}
