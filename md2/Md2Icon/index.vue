<template>
  <div :class="classes.main">
    <slot/>
    <md2-image v-if="icon" v-bind="iconBind" :hide="isActive"/>
    <md2-image v-if="iconActive" v-bind="iconActiveBind" :hide="!isActive"/>
  </div>
</template>

<script lang="ts">
import { IconComponent } from './IconComponent'
import { props } from '../../constructors/Icon/props'
import Md2Image from '../Md2Image/index.vue'

export default {
  name: 'Md2Icon',
  components: { Md2Image },
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
