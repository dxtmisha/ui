import { MaskBuffer } from './MaskBuffer'

export class MaskFocus {
  protected focus = false as boolean

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly buffer: MaskBuffer
  ) {
  }

  is () {
    return this.focus
  }

  in (): void {
    this.focus = true
    this.buffer.reset()
  }

  out (): void {
    this.focus = false
    this.buffer.reset()
  }
}
