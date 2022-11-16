<template lang="pug">
div(:class="classes.main")
</template>

<script lang="ts">
import { IconComponent } from './IconComponent'
import { props } from '../../constructors/Icon/props'

export default {
  name: 'Md2Icon',
  props,
  setup (props: object, context: object) {
    return new IconComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Icon/style';

@include initIcon('md2');
</style>
