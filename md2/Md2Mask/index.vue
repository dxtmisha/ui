<template>
  <label :class="classes.main">
    <input
      ref="element"
      :class="classes.input"
      :type="input"
      :value="standard"
      @blur="onBlur"
      @change="onChange"
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
import { MaskComponent } from './MaskComponent'
import { props } from '../../constructors/Mask/props'

export default {
  name: 'Md2Mask',
  components: {},
  props,
  setup (props: object, context: object) {
    return new MaskComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Mask/style';

@include initMask('md2');
</style>
