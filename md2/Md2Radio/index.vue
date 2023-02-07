<template>
  <label :class="classes.main">
    <input
      ref="input"
      v-model="valueBind"
      :checked="isValue"
      :class="classes.input"
      v-bind="inputBind"
      v-on="on"
      @input.prevent="onRadio"
    >
    <span :class="classes.item">
      <span :class="classes.icon">
        <md2-image v-if="icon" v-bind="iconBind"/>
        <span v-else :class="classes.circle"/>
      </span>
      <md2-ripple v-if="isRipple"/>
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
import { RadioComponent } from './RadioComponent'
import { props } from './props'
import Md2FieldMessage from '../Md2FieldMessage/index.vue'
import Md2Image from '../Md2Image/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'

export default {
  name: 'Md2Radio',
  components: {
    Md2Ripple,
    Md2FieldMessage,
    Md2Image
  },
  props,
  emits: RadioComponent.emits,
  setup (props: object, context: object) {
    return new RadioComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Radio/style';

@include initRadio('md2');
</style>
