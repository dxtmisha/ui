<template lang="pug">
component(
  :is="tag"
  :class="classes.main"
  :disabled="disabled"
)
  span(:class="classes.text") {{ text }}
    slot
  md2-ripple(:inverse="appearance === 'contained'")
</template>

<script lang="ts">
import Md2Ripple from '../Md2Ripple/index.vue'
import { ButtonComponent } from './ButtonComponent'
import { props } from './props'

export default {
  name: 'Md2Button',
  components: { Md2Ripple },
  props,
  setup (props: object, context: object) {
    return new ButtonComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Button/style';

@include initButton('md2');
</style>
