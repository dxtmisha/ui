<template>
  <div
    :class="classes.main"
  >

  </div>
</template>

<script lang="ts">
import { FieldComponent } from './FieldComponent'
import { props } from './props'

export default {
  name: 'Md2Field',
  components: {},
  props,
  emits: FieldComponent.emits,
  setup (props: object, context: object) {
    return new FieldComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Field/style';

@include initField('md2', v-bind(left), v-bind(right));
</style>
