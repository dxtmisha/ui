import { CheckboxComponentAbstract } from '../Checkbox/CheckboxComponentAbstract'

export abstract class RadioComponentAbstract extends CheckboxComponentAbstract {
  protected readonly type = 'radio' as string
}
