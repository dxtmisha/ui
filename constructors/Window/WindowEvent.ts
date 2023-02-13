import { Ref, watch } from 'vue'
import { WindowElements } from './WindowElements'
import { WindowOpen } from './WindowOpen'
import { AssociativeType } from '../types'
import { WindowEmitType } from './types'

export class WindowEvent {
  constructor (
    private readonly emit: (type: string, options: AssociativeType | any) => void,
    private readonly element: Ref<HTMLDivElement | undefined>,
    private readonly elements: WindowElements,
    private readonly open: WindowOpen
  ) {
    watch(this.open.item, value => this.on({
      open: value,
      element: this.element.value,
      control: this.elements.getControl(),
      id: this.elements.getId()
    }))
  }

  private on (options: WindowEmitType): this {
    this.emit('on-window', options)
    this.emit(options.open ? 'on-open' : 'on-close', options)

    return this
  }
}
