<template>
  <md2-field v-bind="fieldBind" v-slot:default="slotDefault">
    <input :class="slotDefault.classes">
  </md2-field>
</template>

<script lang="ts">
import { InputComponent } from './InputComponent'
import { props } from './props'
import Md2Field from '../Md2Field/index.vue'

export default {
  name: 'Md2Input',
  components: { Md2Field },
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
