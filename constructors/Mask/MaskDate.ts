import { computed, Ref } from 'vue'
import { GeoDate } from '../../classes/GeoDate'
import { MaskType } from './MaskType'
import { AssociativeType } from '../types'
import { MaskItemsType, MaskPatternType } from './types'

export class MaskDate {
  protected readonly pattern = {
    Y: '[0-9]{4}',
    M: {
      max: '12',
      min: '1',
      type: 'number'
    },
    D: (value: MaskItemsType): AssociativeType<string> => {
      const date = new GeoDate(`${value?.Y?.value || '2000'}-${value?.M?.value || '01'}-01`)

      return {
        max: date.getMaxDay().value.toString(),
        min: '1',
        type: 'number'
      }
    },
    h: {
      max: '23',
      min: '0',
      type: 'number'
    },
    m: {
      max: '59',
      min: '0',
      type: 'number'
    },
    s: {
      max: '59',
      min: '0',
      type: 'number'
    }
  } as MaskPatternType

  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly type: MaskType,
    protected readonly value: Ref<MaskItemsType>
  ) {
  }

  protected geo = computed<GeoDate>(() => new GeoDate('1987-12-18T10:20:30', this.type.getTypeDate()))

  getMaskByDate (): string[] {
    return this.geo.value.locale('2-digit').value
      .replace('1987', 'YYYY')
      .replace('12', 'MM')
      .replace('18', 'DD')
      .replace('10', 'hh')
      .replace('20', 'mm')
      .replace('30', 'ss')
      .split('')
  }

  getPattern (): MaskPatternType {
    return this.pattern
  }

  getValue (): string {
    const date = this.value.value
    const value = `${date?.Y?.value || '2000'}` +
      `-${date?.M?.value || '01'}` +
      `-${date?.D?.value || '01'}` +
      `T${date?.h?.value || '00'}` +
      `:${date?.m?.value || '00'}` +
      `:${date?.s?.value || '00'}`

    return isNaN(Date.parse(value)) ? '' : new GeoDate(value, this.type.getTypeDate()).standard(false).value
  }

  getLocale (value?: string): string {
    return (value ? new GeoDate(value, this.type.getTypeDate()) : this.geo.value).locale('2-digit').value
  }
}
