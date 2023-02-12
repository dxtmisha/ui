export class WindowClient {
  private x = 0 as number
  private y = 0 as number

  getX () {
    return this.x
  }

  getY () {
    return this.y
  }

  getShiftX (value: number): number | null {
    return this.x ? this.x - value : null
  }

  getShiftY (value: number): number | null {
    return this.y ? this.y - value : null
  }

  set (x: number, y: number) {
    this.x = x
    this.y = y
  }
}
