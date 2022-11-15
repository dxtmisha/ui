<template>
<div class="home flex flex-wrap">
  <div class="relative w-64 h-64">
    <md2-image
      :value="data"
      :hide="hide"
      :disabled="disabled"
    />
    <md2-ripple/>
    <md2-progress :visible="visible"/>
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
    />
    <md2-ripple inverse/>
    <md2-progress :value="100" :max="300"/>
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      size="200%"
    />
    <md2-progress :visible="visible" type="circular"/>
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      x="25%"
    />
    <md2-progress :value="100" :max="300" type="circular"/>
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      :coordinator="[50, 50, 0, 0]"
    />
    <md2-progress :visible="visible" type="circular" indeterminate="type2" inverse/>
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="#ff0000"
      :hide="hide"
      :disabled="disabled"
    />
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="@test"
      :hide="hide"
      :disabled="disabled"
    />
    <md2-ripple/>
    <md2-progress :visible="visible" indeterminate="type2"/>
  </div>
</div>
<div>
  <button @click="onClick">test</button>
  <div>
    <input type="checkbox" name="hide" v-model="hide"> hide
  </div>
  <div>
    <input type="checkbox" name="disabled" v-model="disabled"> disabled
  </div>
  <div>
    <input type="checkbox" name="visible" v-model="visible"> visible
  </div>
</div>
<div style="height: 100px"/>
<div class="home flex flex-wrap">
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="500"
      :object-height="500"
    />
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="1000"
      :object-height="500"
    />
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="500"
      :object-height="1000"
    />
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="1000"
      :object-height="1000"
    />
  </div>
  <div class="relative w-96 h-96">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="1000"
      :object-height="1000"
    />
  </div>
</div>
<div style="height: 800px"/>
<div class="home flex flex-wrap">
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="1500"
      :object-height="1500"
    />
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="2000"
      :object-height="1500"
    />
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="1500"
      :object-height="2000"
    />
  </div>
  <div class="relative w-64 h-64">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="2000"
      :object-height="2000"
    />
  </div>
  <div class="relative w-96 h-96">
    <md2-image
      value="https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e"
      :hide="hide"
      :disabled="disabled"
      adaptive
      :object-width="2000"
      :object-height="2000"
    />
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Md2Image from '../../md2/Md2Image/index.vue'
import { Icon } from '../../constructors/Image/Icon'
import Md2Ripple from '../../md2/Md2Ripple/index.vue'
import Md2Progress from '../../md2/Md2Progress/index.vue'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const file = require('../assets/icons/arrow-left.svg')

Icon.add('test', file)

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Progress,
    Md2Ripple,
    Md2Image
  },
  setup () {
    const data = ref('close')
    return {
      data,
      onClick () {
        data.value = 'https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e'
      },
      hide: ref(),
      disabled: ref(),
      visible: ref(false)
    }
  }
})
</script>

<style/>
