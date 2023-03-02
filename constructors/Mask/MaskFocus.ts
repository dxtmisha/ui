export class MaskFocus {
  protected focus = false as boolean

  is () {
    return this.focus
  }

  in (): void {
    this.focus = true
  }

  out (): void {
    this.focus = false
  }
}
