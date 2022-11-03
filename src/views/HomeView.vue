<template>
<div class="home flex">
  <div class="relative w-64 h-64">
    <md2-image :value="data" :hide="hide"/>
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
    />
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      size="200%"
    />
  </div>
</div>
<div>
  <button @click="onClick">test</button>
  <input type="checkbox" name="hide" v-model="hide">
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Md2Image from '../../md2/Md2Image/index.vue'

export default defineComponent({
  name: 'HomeView',
  components: { Md2Image },
  setup () {
    const data = ref('close')
    return {
      data,
      onClick () {
        data.value = 'https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e'
      },
      hide: ref()
    }
  }
})
</script>

<style/>
