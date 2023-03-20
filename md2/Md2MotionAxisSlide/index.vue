<template>
  <div
    v-if="isShow"
    ref="element"
    :class="classes.main"
    :data-name="name"
    :data-status="status"
    :style="styles.main"
    @transitionend="onTransitionend"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import { MotionAxisSlideComponent } from './MotionAxisComponent'
import { props } from '../../constructors/MotionAxisSlide/props'

export default {
  name: 'Md2MotionAxisSlide',
  components: {},
  props,
  emits: MotionAxisSlideComponent.emits,
  setup (props: object, context: object) {
    return new MotionAxisSlideComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/MotionAxisSlide/style';

@include initMotionAxisSlide('md2');
</style>
