<template>
  <div class="p-6">
    <div class="pb-2">Hello! {{ value }}</div>
    <button class="px-4 py-2 border rounded-xl" @click="onClick">test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Geo } from '../../classes/Geo'
import { GeoPhone } from '../../classes/GeoPhone'
import { GeoFlag } from '../../classes/GeoFlag'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    const flag = new GeoFlag()
    const phone = new GeoPhone()
    const value = ref(123)

    Geo.set('en-VN', true)

    phone.set('+7(902)334-33-33')

    console.log('GeoFlag.get', flag.get().value)
    console.log('GeoFlag.getFlag', flag.getFlag().value)
    console.log('GeoFlag.getList', flag.getList(['US', 'VN']))
    console.log('GeoPhone.getInfo', phone.getInfo().value)
    console.log('GeoPhone.getMask', phone.getMask().value)
    console.log('GeoPhone.toMask', phone.toMask().value)
    console.log('GeoPhone.getItemByPhone', GeoPhone.getItemByPhone('+7(902)334-33-33'))

    return {
      value,
      onClick () {
        value.value += 123
      }
    }
  }
})
</script>

<style/>
