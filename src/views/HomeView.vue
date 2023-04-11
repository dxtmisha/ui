<template>
  <div class="p-6">
    <div class="pb-2">Hello! {{ value }}</div>
    <button class="px-4 py-2 border rounded-xl" @click="onClick">test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { To } from '../../classes/To'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    console.log('replaceTemplate', To.replaceTemplate('ToDefineComponent [replace]', { replace: '-is Replace-' }))
    console.log('replaceTemplate', To.replaceTemplate('[replace] ToDefineComponent', { replace: '-is Replace-' }))
    console.log('replaceTemplate', To.replaceTemplate('ToDefine[replace]Component', { replace: '-is Replace-' }))

    console.log('camelCase', To.camelCase('ToDefineComponent'))
    console.log('camelCase', To.camelCase('to-define-component'))

    console.log('kebabCase', To.kebabCase('ToDefineComponent'))
    console.log('kebabCase', To.kebabCase('to-define-component'))

    console.log('array', To.array(123))
    console.log('array', To.array([123, 234]))

    console.log('date', To.date('2007'))
    console.log('date', To.date('2007-12'))
    console.log('date', To.date('2007-12-10'))
    console.log('date', To.date('2007-12-10 07:20'))
    console.log('date', To.date('2007-12-10T07:20'))
    console.log('date', To.date('2007-12-10 07:20:30'))
    console.log('date', To.date('07:20'))
    console.log('date', To.date('07:20:30'))

    console.log('number', To.number('07:20:30'))
    console.log('number', To.number('123.45'))
    console.log('number', To.number('123,45'))
    console.log('number', To.number('1234.56'))
    console.log('number', To.number('1234,56'))
    console.log('number', To.number('12345.67'))
    console.log('number', To.number('12345,67'))
    console.log('number', To.number('12 345'))
    console.log('number', To.number('12,345'))
    console.log('number', To.number('12 345.67'))
    console.log('number', To.number('12,345.67'))
    console.log('number', To.number('12 345'))
    console.log('number', To.number('12.345'))
    console.log('number', To.number('12 345,67'))
    console.log('number', To.number('12.345,67'))
    console.log('number', To.number('123 456'))
    console.log('number', To.number('123,456'))
    console.log('number', To.number('123 456.78'))
    console.log('number', To.number('123,456.78'))
    console.log('number', To.number('123 456'))
    console.log('number', To.number('123.456'))
    console.log('number', To.number('123 456,78'))
    console.log('number', To.number('123.456,78'))
    console.log('number', To.number('1 234 567'))
    console.log('number', To.number('1,234,567'))
    console.log('number', To.number('1 234 567.89'))
    console.log('number', To.number('1,234,567.89'))
    console.log('number', To.number('1 234 567'))
    console.log('number', To.number('1.234.567'))
    console.log('number', To.number('1 234 567,89'))
    console.log('number', To.number('1.234.567,89'))

    return {
      value: undefined,
      onClick () {
        // Close
      }
    }
  }
})
</script>

<style/>
