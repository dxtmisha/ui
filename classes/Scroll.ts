import { Ref, ref } from 'vue'

const WIDTH = '__d-scroll-width'

export class ScrollControl {
  private static width: number
  private static disabled = ref(false) as Ref<boolean>

  static {
    const width = sessionStorage.getItem(WIDTH)
  }
}
