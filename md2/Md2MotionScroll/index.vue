<template>
  <md2-scrollbar
    ref="element"
    :class="classes.main"
    v-bind="scrollBind"
    @on-before-update="onBeforeUpdate"
    @on-updated="onUpdated"
  >
    <slot/>
  </md2-scrollbar>
</template>

<script lang="ts">
import { MotionScrollComponent } from './MotionScrollComponent'
import { props } from './props'

import Md2Scrollbar from '../Md2Scrollbar/index.vue'

export default {
  name: 'Md2MotionScroll',
  components: { Md2Scrollbar },
  props,
  emits: MotionScrollComponent.emits,
  setup (props: object, context: object) {
    return new MotionScrollComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/MotionScroll/style';

@include initMotionScroll('md2');
</style>
