<template>
  <span
    ref="element"
    :class="classes.main"
    :style="styles.main"
  >
    {{ text }}
  </span>
</template>

<script lang="ts">
import { ImageComponent } from './ImageComponent'
import { props } from '../../constructors/Image/props'

export default {
  name: 'Md2Image',
  props,
  setup (props: object, context: object) {
    return new ImageComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Image/style';

@include initImage('md2');
</style>
