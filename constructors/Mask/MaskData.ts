import { Ref } from 'vue'
import { To } from '../../classes/To'
import { isFilled } from '../../functions'

import { MaskCharacter } from './MaskCharacter'
import { MaskDate } from './MaskDate'
import { MaskFocus } from './MaskFocus'
import { MaskItem } from './MaskItem'
import { MaskMatch } from './MaskMatch'
import { MaskRubber } from './MaskRubber'
import { MaskRubberTransition } from './MaskRubberTransition'
import { MaskSelection } from './MaskSelection'
import { MaskType } from './MaskType'
import { MaskValue } from './MaskValue'

import { ArrayOrStringType } from '../types'
import { MaskBuffer } from './MaskBuffer'

export class MaskData {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    protected readonly element: Ref<HTMLInputElement | undefined>,
    protected readonly type: MaskType,
    protected readonly transition: MaskRubberTransition,
    protected readonly date: MaskDate,
    protected readonly match: MaskMatch,
    protected readonly rubbers: MaskRubber,
    protected readonly item: MaskItem,
    protected readonly selection: MaskSelection,
    protected readonly characters: MaskCharacter,
    protected readonly values: MaskValue,
    protected readonly focus: MaskFocus,
    protected readonly buffer: MaskBuffer
  ) {
  }

  set (
    selection: number,
    chars: ArrayOrStringType,
    focus = true as boolean
  ): boolean {
    let update = false as boolean

    this.selection.setByMask(selection, focus)
    this.transition.reset()

    To.array(chars).forEach(char => {
      const immediate = this.characters.getImmediate()

      this.selection.setShift(
        this.rubbers.set(immediate, char)
      )

      if (this.match.isMatch(char, immediate)) {
        this.characters.shift()

        if (
          this.characters.getFocus() &&
          this.item.getMaxLength() > this.values.getStandardLength()
        ) {
          this.characters.set(char)
          update = true
        }
      } else if (this.transition.is()) {
        this.selection.setByMask(this.item.getByChar(this.transition.get(), this.selection.getImmediate()) + 1, focus)
      }
    })

    this.goSelection()
    return update
  }

  pop (
    start: number,
    end = start as number,
    focus = true as boolean
  ): this {
    if (
      start >= 0 &&
      end <= this.item.getMaxLength()
    ) {
      let quantity = this.item.getSpecialQuantity(start, end)

      if (focus) {
        this.selection.setByMask(end)
      }

      while (quantity--) {
        this.transition.reset()

        this.characters.pop()
        this.characters.shift(0)

        this.selection.setShift(
          this.rubbers.pop(this.characters.getFocus())
        )
      }

      this.goSelection()
    }

    return this
  }

  reset (value = '' as string): this {
    this.characters.reset()
    this.rubbers.reset()

    if (isFilled(value)) {
      const chars = this.type.isDate() ? this.date.getLocale(value) : value
      this.set(0, chars.split(''))
    }

    return this
  }

  goSelection (): this {
    if (this.focus.is()) {
      requestAnimationFrame(() => {
        if (this.element.value) {
          this.element.value.selectionEnd = this.selection.getShift()
          this.element.value.selectionStart = this.selection.getShift()
        }

        this.goBuffer()
      })
    }

    return this
  }

  goBuffer (): this {
    if (this.buffer.is()) {
      this.set(this.selection.getShift(), this.buffer.get())
    }

    this.buffer.reset()
    return this
  }
}
