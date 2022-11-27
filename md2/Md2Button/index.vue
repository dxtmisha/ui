<template lang="pug">
component(
  :is="tag"
  :class="classes.main"
  :disabled="disabled"
)
  md2-icon(v-if="icon" v-bind="iconBind")
  md2-icon(v-if="iconTrailing" v-bind="iconTrailingBind" class="is-trailing" in-end)
  span(v-if="text" :class="classes.text") {{ text }}
  slot
  md2-ripple(v-if="ifRipple" :inverse="appearance === 'contained'")
</template>

<script lang="ts">
import Md2Icon from '../Md2Icon/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'
import { ButtonComponent } from './ButtonComponent'
import { props } from './props'

export default {
  name: 'Md2Button',
  components: {
    Md2Icon,
    Md2Ripple
  },
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
