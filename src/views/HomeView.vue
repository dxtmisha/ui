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
    <md2-progress :value="100" :max="300" bottom/>
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
<div class="flex items-center gap-2">
  <md2-icon :icon="{value: 'close', disabled: true}" :active="active" :turn="turn" :background="background" :hide="hide"
            animation-show :disabled="disabled"/>
  <md2-icon :icon="icon" icon-active="face" size="md" :active="active" :turn="turn" :background="background"
            :hide="hide" :animation-show="animationShow" :disabled="disabled"/>
  <md2-icon icon="close" size="lg" :active="active" :turn="turn" :background="background" :hide="hide"
            animation-type="type2" :animation-show="animationShow" :disabled="disabled"/>
  <md2-icon icon="close" size="xl" :active="active" :turn="turn" :background="background" :hide="hide"
            animation-type="type2" :animation-show="animationShow" :disabled="disabled"/>
  test
</div>
<div>
  <div>
    <input type="checkbox" name="active" v-model="active"> active
  </div>
  <div>
    <input type="checkbox" name="turn" v-model="turn"> turn
  </div>
  <div>
    <input type="checkbox" name="background" v-model="background"> background
  </div>
  <div>
    <input type="checkbox" name="animationShow" v-model="animationShow"> animationShow
  </div>
  <button @click="onClickIcon">test 2</button>
</div>
<div class="flex items-center gap-2 pt-8 pl-8">
  <md2-button text="button"/>
  <md2-button text="red" palette="red"/>
  <md2-button text="green" palette="green"/>
  <md2-button text="dragged" dragged/>
  <md2-button text="readonly" readonly/>
  <md2-button text="selected" selected/>
  <md2-button text="selected+disabled" selected disabled/>
  <md2-button text="disabled" disabled/>
</div>
<div class="flex items-center gap-2 pt-4 pl-8">
  <md2-button appearance="outlined" text="button"/>
  <md2-button appearance="outlined" text="red" palette="red"/>
  <md2-button appearance="outlined" text="green" palette="green"/>
  <md2-button appearance="outlined" text="dragged" dragged/>
  <md2-button appearance="outlined" text="readonly" readonly/>
  <md2-button appearance="outlined" text="selected" selected/>
  <md2-button appearance="outlined" text="selected+disabled" selected disabled/>
  <md2-button appearance="outlined" text="disabled" disabled/>
</div>
<div class="flex items-center gap-2 pt-4 pl-8">
  <md2-button appearance="text" text="button"/>
  <md2-button appearance="text" text="red" palette="red"/>
  <md2-button appearance="text" text="green" palette="green"/>
  <md2-button appearance="text" text="dragged" dragged/>
  <md2-button appearance="text" text="readonly" readonly/>
  <md2-button appearance="text" text="selected" selected/>
  <md2-button appearance="text" text="selected+disabled" selected disabled/>
  <md2-button appearance="text" text="disabled" disabled/>
</div>
<div class="flex items-center gap-2 pt-4 pl-8">
  <md2-button text="sm" height="sm"/>
  <md2-button text="md" height="md"/>
  <md2-button text="lg" height="lg"/>
</div>
<div class="flex items-center gap-2 pt-4 pl-8">
  <md2-button text="l" align="left"/>
  <md2-button text="r" align="right"/>
  <md2-button text="c" align="center"/>
</div>
<div class="flex items-center gap-2 pt-4 pl-8">
  <md2-button text="standard" rounded="standard"/>
  <md2-button text="none" rounded="none"/>
  <md2-button text="sm" rounded="sm"/>
  <md2-button text="md" rounded="md"/>
  <md2-button text="lg" rounded="lg"/>
  <md2-button text="xl" rounded="xl"/>
  <md2-button text="full" rounded="full"/>
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
import { defineComponent, Ref, ref } from 'vue'
import Md2Image from '../../md2/Md2Image/index.vue'
import { Icon } from '../../constructors/Image/Icon'
import Md2Ripple from '../../md2/Md2Ripple/index.vue'
import Md2Progress from '../../md2/Md2Progress/index.vue'
import Md2Icon from '../../md2/Md2Icon/index.vue'
import Md2Button from '../../md2/Md2Button/index.vue'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const file = require('../assets/icons/arrow-left.svg')

Icon.add('test', file)

export default defineComponent({
  name: 'HomeView',
  components: {
    Md2Button,
    Md2Icon,
    Md2Progress,
    Md2Ripple,
    Md2Image
  },
  setup () {
    const data = ref('close')
    const icon = ref('close') as Ref<string | object>
    return {
      data,
      onClick () {
        data.value = 'https://drscdn.500px.org/photo/295251975/q%3D80_m%3D2000_k%3D1/v2?sig=50ca910f43eb0bdee52189ec8aedc2e20819eefa1fdbd088f2b36b0e7e9aa13e'
      },
      onClickIcon () {
        icon.value = {
          value: 'menu',
          disabled: true
        }
      },
      icon,
      hide: ref(),
      disabled: ref(),
      visible: ref(false),
      active: ref(false),
      turn: ref(),
      background: ref(),
      animationShow: ref()
    }
  }
})
</script>

<style/>
