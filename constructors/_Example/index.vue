<template>
  <div :class="classes.main">Example</div>
</template>

<script lang="ts">
import { ExampleComponent } from './ExampleComponent'
import { props } from './props'

export default {
  name: 'Md2Example',
  components: {},
  props,
  emits: ExampleComponent.emits,
  setup (props: object, context: object) {
    return new ExampleComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
// @import '../../constructors/Example/style';
@import './constructors/style';

@include initExample('design');
</style>
