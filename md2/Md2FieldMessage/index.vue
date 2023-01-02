<template>
  <div v-if="ifMessage" ref="element" :class="classes.main">
    <div :class="classes.info">
      <div v-if="validationMessage" :class="classes.validation">{{ validationMessage }}</div>
      <div v-else-if="helperMessage" :class="classes.helper">{{ helperMessage }}</div>
    </div>
    <div v-if="ifCounter" :class="classes.counter">
      <template v-if="ifMax">{{ counter }} / {{ maxlength }}</template>
      <teleport v-else>{{ counter }}</teleport>
    </div>
  </div>
</template>

<script lang="ts">
import { FieldMessageComponent } from './FieldMessageComponent'
import { props } from '../../constructors/FieldMessage/props'

export default {
  name: 'Md2FieldMessage',
  components: {},
  props,
  emits: FieldMessageComponent.emits,
  setup (props: object, context: object) {
    return new FieldMessageComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/FieldMessage/style';

@include initFieldMessage('md2');
</style>
