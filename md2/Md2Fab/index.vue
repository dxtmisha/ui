<template>
  <component
    :is="tag"
    :class="classes.main"
    :disabled="disabledBind"
    :style="styles.main"
    @click="onClick"
  >
    <md2-progress v-if="progress" v-bind="progressBind"/>
    <md2-icon v-if="icon" v-bind="iconBind"/>
    <span v-if="text" :class="classes.text">{{ text }}</span>
    <slot/>
    <md2-ripple v-if="isRipple" :inverse="isInverse"/>
  </component>
</template>

<script lang="ts">
import { FabComponent } from './FabComponent'
import { props } from './props'
import Md2Icon from '../Md2Icon/index.vue'
import Md2Progress from '../Md2Progress/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'

export default {
  name: 'Md2Fab',
  components: {
    Md2Icon,
    Md2Progress,
    Md2Ripple
  },
  props,
  emits: FabComponent.emits,
  setup (props: object, context: object) {
    return new FabComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Fab/style';

@include initFab('md2');
</style>
