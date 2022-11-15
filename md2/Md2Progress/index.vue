<template lang="pug">
component(
  :is="tag"
  :class="classes.main"
  @animationend.stop="onAnimation"
)
</template>

<script lang="ts">
import { props } from '../../constructors/Progress/props'
import { ProgressComponent } from './ProgressComponent'

export default {
  name: 'Md2Progress',
  props,
  setup (props: object, context: object) {
    return new ProgressComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Progress/style';

@include initProgress('md2', v-bind(valueInPercent));
</style>
