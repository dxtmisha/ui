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
      <span :class="classes.icon"></span>
    </span>
  </label>
</template>

<script lang="ts">
import { CheckboxComponent } from './CheckboxComponent'
import { props } from './props'

export default {
  name: 'Md2Checkbox',
  components: {},
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
