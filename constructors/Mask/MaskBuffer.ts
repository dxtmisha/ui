import { MaskData } from './MaskData'

export class MaskBuffer {
  protected item = [] as string[]
  protected start = false as boolean

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected data: MaskData
  ) {
  }

  is () {
    return this.start
  }

  add (key: string): this {
    this.item.push(key)
    return this
  }

  reset (): this {
    this.item = []
    return this
  }

  init (key: string) {
    if (this.start) {
      this.add(key)
    } else {
      this.start = true
    }
  }
}
