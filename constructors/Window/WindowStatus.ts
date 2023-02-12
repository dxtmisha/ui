import { ref } from 'vue'
import { WindowClassesControlType, WindowStatusType } from './types'

const CLASSES = {
  block: 'window-block',
  close: 'window-close',
  controlStatic: 'window-control-static',
  static: 'window-static'
} as WindowClassesControlType

export class WindowStatus {
  readonly item = ref<WindowStatusType>('close')

  isHide (): boolean {
    return this.item.value === 'hide'
  }

  get (): WindowStatusType {
    return this.item.value
  }

  getClassByName (name: keyof WindowClassesControlType): string {
    return name in CLASSES ? `.${CLASSES[name]}` : ''
  }

  set (value: WindowStatusType): this {
    this.item.value = value

    return this
  }
}
