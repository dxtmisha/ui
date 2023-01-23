<template>
  <component
    :is="tag"
    :class="classes.main"
    viewBox="0 0 48 48"
    @animationend.stop="onAnimation"
  >
    <circle
      v-if="isCircular"
      :class="classes.circle"
      cx="24"
      cy="24"
      r="20"
    />
  </component>
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
