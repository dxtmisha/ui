<template>
  <label :class="classes.main">
    <input
      v-if="name"
      :name="name"
      :value="valueBind"
      type="hidden"
    >
    <input
      ref="element"
      :class="classes.input"
      :type="input"
      :value="standardByRight"
      @blur="onBlur"
      @change="onChange"
      @click="onClick"
      @focus="onFocus"
      @input="onInput"
      @keydown="onKeydown"
      v-on="on"
      @keypress.prevent="onKeypress"
      @paste.prevent="onPaste"
    />
    <span ref="charsElement">
      <template v-if="viewBind.length > 0">
        <span
          v-for="({type, value}, index) in viewBind"
          :key="index"
          :class="type"
          v-html="value"
        />
      </template>
      <teleport v-else>&nbsp;</teleport>
    </span>
  </label>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { MaskComponent } from './MaskComponent'
import { props } from '../../constructors/Mask/props'

export default defineComponent({
  name: 'Md2Mask',
  components: {},
  props,
  emits: MaskComponent.emits,
  setup (props: object, context: object) {
    return new MaskComponent(props, context).setup()
  }
})
</script>

<style lang="scss">
@import '../../constructors/Mask/style';

@include initMask('md2');
</style>
