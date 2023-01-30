<template>
  <textarea
    ref="element"
    v-model="valueBind"
    v-bind="$attrs"
    @change="onChange"
    @input="onInput"
    v-on="on"
  />
</template>

<script lang="ts">
import { TextareaAutosizeComponent } from './TextareaAutosizeComponent'
import { props } from '../../constructors/TextareaAutosize/props'

export default {
  name: 'Md2TextareaAutosize',
  inheritAttrs: false,
  props,
  emits: TextareaAutosizeComponent.emits,
  setup (props: object, context: object) {
    return new TextareaAutosizeComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/TextareaAutosize/style';

@include initTextareaAutosize('md2');
</style>
