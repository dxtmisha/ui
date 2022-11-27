<template lang="pug">
component(
  :is="tag"
  :class="classes.main"
  :disabled="disabled"
)
  md2-icon(v-if="icon" v-bind="iconBind")
    md2-progress(
      v-if="progress"
      :inverse="ifInverse"
      :visible="progress"
      type="circular"
      dense
    )
  md2-progress(
    v-else-if="progress"
    :inverse="ifInverse"
    :visible="progress"
    type="circular"
  )
  md2-icon(
    v-if="iconTrailing"
    v-bind="iconTrailingBind"
    :turn="turn"
    class="is-trailing"
    in-end
  )
  template(v-if="ifText")
    span(:class="classes.text") {{ text }}
      slot
  md2-ripple(v-if="ifRipple" :inverse="ifInverse")
</template>

<script lang="ts">
import Md2Icon from '../Md2Icon/index.vue'
import Md2Progress from '../Md2Progress/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'
import { ButtonComponent } from './ButtonComponent'
import { props } from './props'

export default {
  name: 'Md2Button',
  components: {
    Md2Icon,
    Md2Progress,
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
