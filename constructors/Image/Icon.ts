import { forEach } from '../../functions/data'
import { AssociativeType } from '../types'

export class Icon {
  private static readonly icons = {} as AssociativeType<string>

  static add (
    index: string,
    file: string
  ): void {
    this.icons[`@${index}`] = file
  }

  static addByList (list: AssociativeType<string>): void {
    forEach<string, string, void>(list, (file, index) => this.add(index, file))
  }

  static get (index: string, url = ''): string {
    return this.icons?.[index] || index.replace(/^@/, url) + '.svg'
  }
}
