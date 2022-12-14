<template>
  <component
    :is="tag"
    :class="classes.main"
    :disabled="disabled"
    :style="styles.main"
  >
    <span v-if="text" :class="classes.text">{{ text }}</span>
    <slot/>
  </component>
</template>

<script lang="ts">
import { ListItemComponent } from './ListItemComponent'
import { props } from './props'
import Md2Icon from '../Md2Icon/index.vue'
import Md2Progress from '../Md2Progress/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'

export default {
  name: 'Md2ListItem',
  components: {
    Md2Icon,
    Md2Progress,
    Md2Ripple
  },
  props,
  emits: ListItemComponent.emits,
  setup (props: object, context: object) {
    return new ListItemComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/ListItem/style';

@include initListItem('md2');
</style>
