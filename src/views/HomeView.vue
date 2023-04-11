<template>
  <div class="p-6">
    <div class="pb-2">Hello! {{ value }}</div>
    <button class="px-4 py-2 border rounded-xl" @click="onClick">test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Hash } from '../../classes/Hash'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    const storage1 = new Hash('test')
    const storage2 = new Hash('test')
    let newValue = 5;

    (async () => {
      console.log(
        'storage',

        storage1.get().value,
        storage1.get((newValue + 3).toString()).value,
        storage1.get(() => (newValue + 3).toString()).value,

        storage2.set((12).toString()),
        storage1.getStatic()
      )
    })()

    setTimeout(() => storage1.remove(), 4000)
    setTimeout(() => storage1.set((123).toString()), 6000)

    return {
      value: storage1.get(),
      onClick () {
        storage1.set((newValue++).toString())
      }
    }
  }
})
</script>

<style/>
