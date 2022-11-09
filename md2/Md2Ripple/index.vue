<template lang="pug">
div(ref="element" :class="classes.main")
</template>

<script lang="ts">
import { RippleComponent } from './RippleComponent'
import { props } from '../../constructors/Ripple/props'

export default {
  name: 'Md2Ripple',
  props,
  setup (props: object, context: object) {
    return new RippleComponent(props, context).setup()
  }
}
</script>

<style lang="scss">

</style>
