<template>
  <div :class="classes.main">{{ open }}</div>
</template>

<script lang="ts">
import { MotionTransformComponent } from './MotionTransformComponent'
import { props } from './props'

export default {
  name: 'Md2MotionTransform',
  components: {},
  props,
  emits: MotionTransformComponent.emits,
  setup (props: object, context: object) {
    return new MotionTransformComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/MotionTransform/style';

@include initMotionTransform('md2');
</style>
