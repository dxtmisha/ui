<template>
  <div></div>
</template>

<script lang="ts">
import { InputComponent } from './InputComponent'
import { props } from './props'

export default {
  name: 'Md2Input',
  components: {},
  props,
  emits: InputComponent.emits,
  setup (props: object, context: object) {
    return new InputComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Input/style';

@include initInput('md2');
</style>
