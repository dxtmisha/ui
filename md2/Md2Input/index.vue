<template>
  <md2-field
    v-slot:default="slotDefault"
    :counter="counterBind"
    :disabled-next="disabledNext"
    :disabled-previous="disabledPrevious"
    :icon-trailing="iconTrailingBind"
    :validation-message="validationMessageBind"
    :value="valueBind"
    v-bind="fieldBind"
    @on-previous="onPrevious"
    @on-next="onNext"
    @on-cancel="onCancel"
    @on-trailing="onTrailing"
  >
    <md2-mask
      v-if="maskBind"
      :id="slotDefault.id"
      ref="element"
      :class="slotDefault.classes"
      :value="valueOriginalBind"
      v-bind="maskBind"
      v-on="on"
      @on-blur="onBlur"
      @on-change="onChange"
      @on-input="onInput"
    />
    <input
      v-else
      :id="slotDefault.id"
      ref="element"
      v-model="valueBind"
      :class="slotDefault.classes"
      v-bind="inputBind"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
      @keypress="onKeypress"
      @paste="onPaste"
      v-on="on"
    >
  </md2-field>
</template>

<script lang="ts">
import { InputComponent } from './InputComponent'
import { props } from './props'
import Md2Field from '../Md2Field/index.vue'
import Md2Mask from '../Md2Mask/index.vue'

export default {
  name: 'Md2Input',
  components: {
    Md2Field,
    Md2Mask
  },
  props,
  emits: InputComponent.emits,
  setup (props: object, context: object) {
    return new InputComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Input/style';

@include initInput('md2');
</style>
