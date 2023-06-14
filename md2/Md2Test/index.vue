<script lang="ts">
import { computed, defineComponent } from 'vue'
import { TestComponent } from './TestComponent'
import { props } from './props'

export default defineComponent({
  name: 'Md2Test',
  props,
  setup (props, context) {
    // return new TestComponent(props, context).setup()
    return {
      classes: computed(() => {
        return {
          'md2-test--height--sm': props.height === 'sm',
          'md2-test--height--md': props.height === 'md',
          'md2-test--height--lg': props.height === 'lg'
        }
      })
    }
  }
})
</script>

<template>
  <button :class="classes" class="md2-test">{{ text }}</button>
</template>

<style lang="scss">
@import "../../styles/properties";

.md2-test {
  color: rgba(var(--md2-sys-palette-white), 1);
  background-color: rgba(var(--md2-sys-palette-orange), 1);

  &--height {
    &--sm {
      height: var(--md2-ref-spacing-8);
    }

    &--md {
      height: var(--md2-ref-spacing-10);
    }

    &--lg {
      height: var(--md2-ref-spacing-12);
    }
  }
}

/*
@include propertiesInit('md2', 'test') {

}
*/
</style>
