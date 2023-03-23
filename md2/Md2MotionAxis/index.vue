<template>
  <div :class="classes.main">
    <md2-motion-axis-slide
      v-for="(html, name) in this.$slots"
      :key="name"
      :name="name"
      v-bind="slideBind"
      @on-status="onStatus"
    >
      <slot :name="name"/>
    </md2-motion-axis-slide>
  </div>
</template>

<script lang="ts">
import { MotionAxisComponent } from './MotionAxisComponent'
import { props } from '../../constructors/MotionAxis/props'

import Md2MotionAxisSlide from '../Md2MotionAxisSlide/index.vue'

export default {
  name: 'Md2MotionAxis',
  components: { Md2MotionAxisSlide },
  props,
  emits: MotionAxisComponent.emits,
  setup (props: object, context: object) {
    return new MotionAxisComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/MotionAxis/style';

@include initMotionAxis('md2');
</style>
