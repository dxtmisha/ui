<template>
  <div v-if="isMessage" ref="element" :class="classes.main">
    <div :class="classes.info">
      <div v-if="validationMessage && !disabled" :class="classes.validation">{{ validationMessage }}</div>
      <div v-else-if="helperMessage || 'default' in $slots" :class="classes.helper">
        {{ helperMessage }}
        <slot/>
      </div>
    </div>
    <div v-if="isCounter" :class="classes.counter">
      <template v-if="isMax">{{ counter }} / {{ maxlength }}</template>
      <template v-else>{{ counter }}</template>
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
