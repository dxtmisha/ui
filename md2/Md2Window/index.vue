<template>
  <div :class="classes.main">
    <slot/>
  </div>
</template>

<script lang="ts">
import { props } from '../../constructors/Window/props'
import { WindowComponent } from './WindowComponent'

export default {
  name: 'Md2Window',
  inheritAttrs: false,
  props,
  setup (props: object, context: object) {
    return new WindowComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Window/style';

@include initWindow('md2');
</style>
