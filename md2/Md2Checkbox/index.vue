<template>
  <div>CheckboxComponent</div>
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
