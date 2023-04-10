<template>
  <div class="p-6">
    <div class="pb-2">Hello! {{ value }}</div>
    <button class="px-4 py-2 border rounded-xl" @click="onClick">test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { StorageItem } from '../../classes/StorageItem'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    const storage1 = new StorageItem('test')
    const storage2 = new StorageItem('test')
    const test = ref(9)
    let newValue = 5

    console.log(
      'storage',

      storage2.getAsync(() => new Promise(resolve => {
        setTimeout(() => {
          resolve(16)
          console.log('resolve(16)')
        }, 2000)
      })),

      storage1.get().value,
      storage1.get(newValue + 3).value,
      storage1.get(test).value,
      storage1.get(() => newValue + 3).value,

      storage2.set(12),
      storage1.getStatic()
    )

    setTimeout(() => storage1.remove(), 4000)

    return {
      value: storage1.get(),
      onClick () {
        storage1.set(newValue++)
      }
    }
  }
})
</script>

<style/>
