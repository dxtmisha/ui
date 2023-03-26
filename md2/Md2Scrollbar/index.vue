<template>
  <component
    :is="tag"
    ref="element"
    :class="classes.main"
  >
    <slot/>
  </component>
</template>

<script lang="ts">
import { ScrollbarComponent } from './ScrollbarComponent'
import { props } from './props'

export default {
  name: 'Md2Scrollbar',
  props,
  setup (props: object, context: object) {
    return new ScrollbarComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Scrollbar/style';

@include initScrollbar('md2');
</style>
