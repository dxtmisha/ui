<template>
  <slot
    name="control"
    :classes="classes.control"
    :open="open"
    :toggle="toggle"
    :on="on"
  />
  <teleport to="body">
    <div
      v-if="open"
      :class="classes.main"
      :data-window="id"
      :data-status="status"
    >
      <div :class="classes.body">
        asd
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { props } from '../../constructors/Window/props'
import { WindowComponent } from './WindowComponent'

export default {
  name: 'Md2Window',
  inheritAttrs: false,
  props,
  setup (props: object, context: object) {
    return new WindowComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Window/style';

@include initWindow('md2');
</style>
