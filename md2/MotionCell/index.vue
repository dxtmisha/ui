<template>
  <div
    ref="element"
    :class="classes.main"
    @transitionend="onTransition"
  >
    <slot/>
  </div>
</template>

<script lang="ts">
import { MotionCellComponent } from './MotionCellComponent'

export default {
  name: 'Md2MotionCell',
  components: {},
  emits: MotionCellComponent.emits,
  setup (props: object, context: object) {
    return new MotionCellComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/MotionCell/style';

@include initMotionCell('md2');
</style>
