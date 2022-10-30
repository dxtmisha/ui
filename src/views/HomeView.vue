<template>
  <div class="home">
    <div>
      <md2-image/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import Md2Image from "../../md2/Md2Image/index.vue";

export default defineComponent({
  name: 'HomeView',
  components: {Md2Image},
  setup() {
    return {}
  }
})
</script>

<style/>
