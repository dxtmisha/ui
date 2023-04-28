import {
  executeFunction,
  forEach,
  getColumn,
  getExp,
  isFilled,
  isFunction,
  isIntegerBetween,
  isNull,
  isSelected,
  isSelectedByList
} from '../../../functions/data'

describe('functions/data', () => {
  it('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(true)
    expect(isNull('string')).toBe(false)
  })

  it('isFilled', () => {
    expect(isFilled(0)).toBe(false)
    expect(isFilled(123)).toBe(true)
    expect(isFilled(123.456)).toBe(true)

    expect(isFilled(true)).toBe(true)
    expect(isFilled(false)).toBe(false)

    expect(isFilled(() => true)).toBe(true)
    expect(isFilled(() => false)).toBe(true)
    expect(isFilled(() => 'string')).toBe(true)
    expect(isFilled(Symbol('123'))).toBe(true)

    expect(isFilled([])).toBe(false)
    expect(isFilled([1, 2, 3])).toBe(true)

    expect(isFilled({})).toBe(false)
    expect(isFilled({
      a: 1,
      b: 2
    })).toBe(true)

    expect(isFilled('')).toBe(false)
    expect(isFilled('undefined')).toBe(false)
    expect(isFilled('string')).toBe(true)
  })

  it('isFunction', () => {
    expect(isFunction(undefined)).toBe(false)
    expect(isFunction(null)).toBe(false)
    expect(isFunction(0)).toBe(false)
    expect(isFunction(123456789)).toBe(false)
    expect(isFunction('string')).toBe(false)
    expect(isFunction(() => 123)).toBe(true)
  })

  it('isIntegerBetween', () => {
    expect(isIntegerBetween(5, 5.1)).toBe(true)
    expect(isIntegerBetween(5, 5.9)).toBe(true)
    expect(isIntegerBetween(5, 4.9)).toBe(true)
    expect(isIntegerBetween(5, 4.1)).toBe(true)

    expect(isIntegerBetween(3, 4.1)).toBe(false)
    expect(isIntegerBetween(2, 4.1)).toBe(false)
  })

  it('isSelected/isSelectedByList', () => {
    expect(isSelected('hello', ['goodbye', 'hello'])).toBe(true)
    expect(isSelected('hello', ['goodbye', 'world'])).toBe(false)

    expect(isSelected(null, 'hello')).toBe(false)
    expect(isSelected(undefined, 'hello')).toBe(false)
    expect(isSelected(undefined, undefined)).toBe(false)
    expect(isSelected(undefined, [undefined])).toBe(false)

    expect(isSelected('hello', 'hello')).toBe(true)
    expect(isSelected('world', 'hello')).toBe(false)

    expect(isSelectedByList('hello', 'hello')).toBe(true)
    expect(isSelectedByList('world', 'hello')).toBe(false)

    expect(isSelectedByList('hello', ['goodbye', 'hello'])).toBe(true)
    expect(isSelectedByList(['goodbye', 'hello'], ['goodbye', 'hello'])).toBe(true)
    expect(isSelectedByList(['goodbye', 'world'], ['goodbye', 'hello'])).toBe(false)
  })

  it('getExp', () => {
    const pattern = '(test|:value)'

    expect(getExp('hello', 'i', pattern)).toEqual(/(test|hello)/i)
    expect(getExp('hel[lo', 'i', pattern)).toEqual(/(test|hel\[lo)/i)
    expect(getExp('h.el[lo', 'i', pattern)).toEqual(/(test|h\.el\[lo)/i)
  })

  it('getColumn', () => {
    const data = [
      {
        a: 'a1',
        b: 'b1'
      },
      {
        a: 'a2',
        b: 'b2'
      },
      {
        a: 'a3',
        b: 'b3'
      }
    ]

    expect(getColumn(data, 'a')).toEqual(['a1', 'a2', 'a3'])
    expect(getColumn(data, 'b')).toEqual(['b1', 'b2', 'b3'])
    expect(getColumn(data, 'c')).toEqual([undefined, undefined, undefined])
  })

  it('executeFunction', () => {
    const data = 'hello'

    expect(executeFunction(undefined)).toEqual(undefined)
    expect(executeFunction(null)).toEqual(null)
    expect(executeFunction(() => data)).toEqual(data)
    expect(executeFunction(data)).toEqual(data)
  })

  it('forEach', () => {
    const callback = jest.fn(value => value)
    const data = {
      a: 1,
      b: 2,
      c: 3
    }
    const result = forEach(data, callback)

    expect(callback).toHaveBeenCalledTimes(3)
    expect(callback).toHaveBeenCalledWith(1, 'a', data)
    expect(callback).toHaveBeenCalledWith(2, 'b', data)
    expect(callback).toHaveBeenCalledWith(3, 'c', data)

    expect(result).toEqual([1, 2, 3])
    expect(forEach([1, 2, 3], callback)).toEqual([1, 2, 3])
    expect(forEach([1, 2, undefined], callback)).toEqual([1, 2, undefined])
    expect(forEach([1, 2, undefined], callback, true)).toEqual([1, 2])
    expect(forEach([1, undefined, 3], callback, true)).toEqual([1, 3])
  })
})
