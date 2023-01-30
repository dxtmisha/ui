<template>
  <textarea
    ref="element"
    v-model="valueBind"
    :class="classes.main"
    :style="styles.main"
    v-bind="$attrs"
    @change="onChange"
    @input="onInput"
    v-on="on"
  />
  <div v-once ref="clone" :class="classes.clone"/>
</template>

<script lang="ts">
import { TextareaAutosizeComponent } from './TextareaAutosizeComponent'
import { props } from './props'

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
