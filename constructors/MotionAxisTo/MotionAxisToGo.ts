import { MotionAxisToAxis } from './MotionAxisToAxis'
import { MotionAxisToSelected } from './MotionAxisToSelected'
import { MotionAxisToTransition } from './MotionAxisToTransition'
import { MotionAxisAxisType, MotionAxisTransitionType } from '../MotionAxis/props.type'

export type MotionAxisToGoSetupType = {
  to: (
    value: string,
    axis?: MotionAxisAxisType,
    transition?: MotionAxisTransitionType
  ) => void
  toTop: (value: string) => void
  toBottom: (value: string) => void
  toLeft: (value: string) => void
  toRight: (value: string) => void
  toDown: (value: string) => void
  toUp: (value: string) => void
}

export class MotionAxisToGo {
  // eslint-disable-next-line no-useless-constructor
  constructor (
    private readonly selector: MotionAxisToSelected,
    private readonly axis: MotionAxisToAxis,
    private readonly transition: MotionAxisToTransition
  ) {
  }

  to (
    value: string,
    axis?: MotionAxisAxisType,
    transition?: MotionAxisTransitionType
  ): void {
    if (!this.selector.is(value)) {
      this.axis.set(axis)
      this.transition.set(transition)
      this.selector.set(value)
    }
  }

  toTop (value: string): void {
    this.to(value, 'y', 'back')
  }

  toBottom (value: string): void {
    this.to(value, 'y', 'next')
  }

  toLeft (value: string): void {
    this.to(value, 'x', 'back')
  }

  toRight (value: string): void {
    this.to(value, 'x', 'next')
  }

  toDown (value: string): void {
    this.to(value, 'z', 'back')
  }

  toUp (value: string): void {
    this.to(value, 'z', 'next')
  }

  getSetup (): MotionAxisToGoSetupType {
    return {
      to: (
        value: string,
        axis?: MotionAxisAxisType,
        transition?: MotionAxisTransitionType
      ) => this.to(value, axis, transition),
      toTop: value => this.toTop(value),
      toBottom: value => this.toBottom(value),
      toLeft: value => this.toLeft(value),
      toRight: value => this.toRight(value),
      toDown: value => this.toDown(value),
      toUp: value => this.toUp(value)
    }
  }
}
