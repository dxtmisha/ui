<template lang="pug">
div
</template>

<script lang="ts">
import { props } from '../../constructors/Progress/props'

export default {
  name: 'Md2Progress',
  props
}
</script>

<style lang="scss">
@import '../../constructors/Progress/style';

@include initProgress('md2');
</style>
