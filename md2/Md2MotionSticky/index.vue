<template>
  <div :class="classes.main">
    <slot/>
  </div>
</template>

<script lang="ts">
import { MotionStickyComponent } from './MotionStickyComponent'
import { props } from '../../constructors/MotionSticky/props'

export default {
  name: 'Md2MotionSticky',
  components: {},
  props,
  emits: MotionStickyComponent.emits,
  setup (props: object, context: object) {
    return new MotionStickyComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/MotionSticky/style';

@include initMotionSticky('md2');
</style>
