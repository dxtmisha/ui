<template>
  <div :class="classes.main"></div>
</template>

<script lang="ts">
import { MaskComponent } from './MaskComponent'
import { props } from '../../constructors/Mask/props'

export default {
  name: 'Md2Mask',
  components: {},
  props,
  setup (props: object, context: object) {
    return new MaskComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Mask/style';

@include initMask('md2');
</style>
