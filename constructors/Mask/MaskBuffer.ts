export class MaskBuffer {
  protected item = [] as string[]
  protected start = false as boolean

  is () {
    return this.item.length > 0
  }

  get (): string[] {
    return this.item
  }

  add (key: string): this {
    this.item.push(key)
    return this
  }

  reset (): this {
    this.item = []
    this.start = false

    return this
  }

  init (key: string): boolean {
    if (this.start) {
      this.add(key)
      return false
    } else {
      this.start = true
      return true
    }
  }
}
