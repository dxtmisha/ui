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
    <span :class="classes.item">
      <span :class="classes.icon">
        <md2-progress v-if="progress" v-bind="progressBind"/>
        <md2-image v-bind="iconBind"/>
      </span>
      <md2-ripple v-if="isRipple"/>
    </span>
    <span v-if="isText" :class="classes.text">
      <span>
        {{ text }}<slot/>
        <span v-if="required" :class="classes.required"/>
      </span>
      <md2-field-message v-if="isEnabled" v-bind="messageBind">
        <template v-slot:default>
          <slot name="message"/>
        </template>
      </md2-field-message>
    </span>
  </label>
</template>

<script lang="ts">
import { CheckboxComponent } from './CheckboxComponent'
import { props } from './props'
import Md2FieldMessage from '../Md2FieldMessage/index.vue'
import Md2Image from '../Md2Image/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'
import Md2Progress from '../Md2Progress/index.vue'

export default {
  name: 'Md2Checkbox',
  components: {
    Md2Progress,
    Md2Ripple,
    Md2FieldMessage,
    Md2Image
  },
  props,
  emits: CheckboxComponent.emits,
  setup (props: object, context: object) {
    return new CheckboxComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Checkbox/style';

@include initCheckbox('md2');
</style>
