<template>
  <div :class="classes.main">
    <div
      v-for="(html, name) in this.$slots"
      :key="name"
      :ref="(el) => { if (el) slides.add(name, el) }"
      :class="classes.slide"
      :data-name="name"
      :data-status="list[name]?.status"
      @transitionend="onTransitionend(name, $event)"
    >
      {{ name }}
      <slot :name="name"/>
    </div>
    {{ list }}
  </div>
</template>

<script lang="ts">
import { MotionAxisComponent } from './MotionAxisComponent'
import { props } from '../../constructors/MotionAxis/props'

export default {
  name: 'Md2MotionAxis',
  components: {},
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
