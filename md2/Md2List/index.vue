<template>
  <div>ok</div>
</template>

<script lang="ts">
import { ListComponent } from './ListComponent'
import { props } from './props'

export default {
  name: 'Md2List',
  components: {},
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
