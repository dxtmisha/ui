<template>
  <component
    :is="tag"
    :class="classes.main"
    :disabled="disabledBind"
    :style="styles.main"
    @click="onClick"
  >
    <md2-icon v-if="icon" v-bind="iconBind">
      <md2-progress v-if="progress" dense v-bind="progressBind"/>
    </md2-icon>
    <md2-progress v-else-if="progress" v-bind="progressBind"/>
    <md2-icon v-if="iconTrailing" v-bind="iconTrailingBind"/>
    <span v-if="text" :class="classes.text">{{ text }}</span>
    <slot/>
    <md2-ripple v-if="isRipple" :inverse="isInverse"/>
  </component>
</template>

<script lang="ts">
import { ButtonComponent } from './ButtonComponent'
import { props } from './props'
import Md2Icon from '../Md2Icon/index.vue'
import Md2Progress from '../Md2Progress/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'

export default {
  name: 'Md2Button',
  components: {
    Md2Icon,
    Md2Progress,
    Md2Ripple
  },
  props,
  emits: ButtonComponent.emits,
  setup (props: object, context: object) {
    return new ButtonComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Button/style';

@include initButton('md2');
</style>
