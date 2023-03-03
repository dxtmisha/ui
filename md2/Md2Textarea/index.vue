<template>
  <md2-field
    v-slot:default="slotDefault"
    :counter="counterBind"
    :icon-trailing="iconTrailing"
    :validation-message="validationMessageBind"
    :value="isValue"
    v-bind="fieldBind"
  >
    <md2-textarea-autosize
      :id="slotDefault.id"
      ref="element"
      :class="slotDefault.classes"
      :value="valueOriginalBind"
      v-bind="inputBind"
      @blur="onBlur"
      @change="onChange"
      @input="onInput"
      v-on="on"
    />
  </md2-field>
</template>

<script lang="ts">
import { TextareaComponent } from './TextareaComponent'
import { props } from './props'
import Md2Field from '../Md2Field/index.vue'
import Md2TextareaAutosize from '../Md2TextareaAutosize/index.vue'

export default {
  name: 'Md2Textarea',
  components: {
    Md2TextareaAutosize,
    Md2Field
  },
  props,
  emits: TextareaComponent.emits,
  setup (props: object, context: object) {
    return new TextareaComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Textarea/style';

@include initTextarea('md2');
</style>
