export class Env {
  static get (key: string, value?: string): string {
    return process.env?.[`VUE_APP_${key}`] || value
  }

  static prefix (): string {
    return this.get('PREFIX', '_d_')
  }

  static toNumber (key: string, value = 0 as number): number {
    return parseFloat(this.get(key, value.toString()))
  }
}
