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
      v-if="isOpen"
      ref="element"
      :class="classes.main"
      :data-status="status"
      :data-window="id"
      :style="styles.main"
      v-bind="$attrs"
      @animationend="onAnimation"
      @transitionend="onTransition"
    >
      <div :class="classes.body">
        <slot name="title" :open="open" :toggle="toggle"/>
        <md2-scrollbar :class="classes.context">
          <slot :open="open" :toggle="toggle"/>
        </md2-scrollbar>
        <slot name="footer" :open="open" :toggle="toggle"/>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { WindowComponent } from './WindowComponent'
import { props } from './props'
import Md2Scrollbar from '../Md2Scrollbar/index.vue'

export default {
  name: 'Md2Window',
  components: { Md2Scrollbar },
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
