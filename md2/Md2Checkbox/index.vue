<template>
  <label :class="classes.main">
    <input :name="name" type="hidden" value="0">
    <input
      ref="input"
      v-model="valueBind"
      :checked="valueBind"
      :class="classes.input"
      :type="type"
      :value="valueDefault"
      v-bind="inputBind"
      v-on="on"
      @input.prevent="onChecked"
    >
    <span :class="classes.item">
      <span :class="classes.icon">
        <md2-image v-bind="iconBind"/>
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
import { CheckboxComponent } from './CheckboxComponent'
import { props } from './props'
import Md2FieldMessage from '../Md2FieldMessage/index.vue'
import Md2Image from '../Md2Image/index.vue'

export default {
  name: 'Md2Checkbox',
  components: {
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
