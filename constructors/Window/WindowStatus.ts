import { WindowClassesControlType } from './types'

export class WindowStatus {
  static readonly CLASSES = {
    block: 'window-block',
    close: 'window-close',
    controlStatic: 'window-control-static',
    static: 'window-static'
  } as WindowClassesControlType

  static get (name: keyof WindowClassesControlType): string {
    return this.CLASSES?.[name] || ''
  }
}
