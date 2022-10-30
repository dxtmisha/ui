<template lang="pug">
  span(:class="classes.main" :style="styles.main")
</template>

<script lang="ts">
import {ImageComponent} from "./ImageComponent";

export default {
  name: "Md2Image",
  setup(props: object, context: object) {
    return new ImageComponent(props, context).setup()
  }
}
</script>

<style lang="scss">

</style>
