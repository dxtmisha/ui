<template lang="pug">
div(:class="classes.main")
</template>

<script lang="ts">
import { ButtonComponent } from './ButtonComponent'
import { props } from '../../constructors/Button/props'

export default {
  name: 'Md2Button',
  components: {},
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
