<template>
  <md2-motion-axis
    :selected="selectedBind"
    :axis="axis"
    :transition="transition"
    :animation-type="animationType"
    @on-status="onStatus"
  >
    <template v-for="(html, name) in this.$slots" :key="name" v-slot:[name]>
      <slot :name="name"/>
    </template>
  </md2-motion-axis>
</template>

<script lang="ts">
import { MotionAxisToComponent } from './MotionAxisToComponent'
import { props } from '../../constructors/MotionAxis/props'

import Md2MotionAxis from '../Md2MotionAxis/index.vue'

export default {
  name: 'Md2MotionAxisTo',
  components: { Md2MotionAxis },
  props,
  emits: MotionAxisToComponent.emits,
  setup (props: object, context: object) {
    return new MotionAxisToComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/MotionAxis/style';

@include initMotionAxis('md2');
</style>
