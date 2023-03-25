<template>
  <div :class="classes.main">Example</div>
</template>

<script lang="ts">
import { MotionScrollComponent } from './MotionScrollComponent'
import { props } from '../../constructors/MotionScroll/props'

export default {
  name: 'Md2MotionScroll',
  components: {},
  props,
  emits: MotionScrollComponent.emits,
  setup (props: object, context: object) {
    return new MotionScrollComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../constructors/MotionScroll/style';

@include initMotionScroll('md2');
</style>
