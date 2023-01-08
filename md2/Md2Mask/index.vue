<template>
  <label :class="classes.main">
    <input
      ref="element"
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
    <input ref="dateElement"/>
    <span ref="charsElement"></span>
    <div/>
    {{ validation }}
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
