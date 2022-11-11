<template lang="pug">
div(:class="classes.main")
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

@include initProgress('md2');
</style>
