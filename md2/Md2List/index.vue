<template>
  <div :class="classes.main">
    <template
      v-for="item in listBind"
      :key="item.value"
    >
      <md2-list-item v-bind="item"/>
    </template>
  </div>
</template>

<script lang="ts">
import { ListComponent } from './ListComponent'
import { props } from './props'
import Md2ListItem from '../Md2ListItem/index.vue'

export default {
  name: 'Md2List',
  components: { Md2ListItem },
  props,
  emits: ListComponent.emits,
  setup (props: object, context: object) {
    return new ListComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import './constructors/List/style';

@include initList('md2') {
}
</style>
