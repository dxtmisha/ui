import { StorageItem } from '../../../classes/StorageItem'

describe('classes/StorageItem', () => {
  const mockValue = 'test'

  class StorageItemTest extends StorageItem {
    constructor () {
      super('key')
    }
  }

  it('returns a computed ref of data', () => {
    const item = new StorageItemTest()

    expect(item.get().value).toEqual(undefined)
    expect(item.get(mockValue).value).toEqual(mockValue)

    item.set(mockValue)
    expect(item.get().value).toEqual(mockValue)
  })

  it('executes a valueCallback when data is unavailable', () => {
    const item = new StorageItemTest()
    const valueCallback = jest.fn(() => mockValue)
    console.log('valueCallback', valueCallback)
    expect(item.get(valueCallback).value).toEqual(mockValue)
    expect(valueCallback).toHaveBeenCalled()
  })
})
