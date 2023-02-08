<template>
  <label :class="classes.main">
    <input :name="name" type="hidden" value="0">
    <input
      ref="input"
      v-model="valueBind"
      :checked="isValue"
      :class="classes.input"
      v-bind="inputBind"
      v-on="on"
      @input.prevent="onChecked"
    >
    <span :class="classes.switch">
      <span :class="classes.circle">
        <md2-image v-if="icon" v-bind="iconBind"/>
        <md2-ripple v-if="isRipple"/>
      </span>
    </span>
    <span v-if="isText" :class="classes.text">
      <span>
        {{ text }}<slot/>
        <span v-if="required" :class="classes.required"/>
      </span>
      <md2-field-message v-bind="messageBind">
        <template v-slot:default>
          <slot name="message"/>
        </template>
      </md2-field-message>
    </span>
  </label>
</template>

<script lang="ts">
import { SwitchComponent } from './SwitchComponent'
import { props } from './props'
import Md2FieldMessage from '../Md2FieldMessage/index.vue'
import Md2Image from '../Md2Image/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'

export default {
  name: 'Md2Switch',
  components: {
    Md2Ripple,
    Md2FieldMessage,
    Md2Image
  },
  props,
  emits: SwitchComponent.emits,
  setup (props: object, context: object) {
    return new SwitchComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Switch/style';

@include initSwitch('md2');
</style>
