<template>
  <div class="p-6">
    <div class="pb-2">Hello! {{ value }}</div>
    <button class="px-4 py-2 border rounded-xl" @click="onClick">test</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { GeoDate } from '../../classes/GeoDate'

export default defineComponent({
  name: 'HomeView',
  components: {},
  setup () {
    const date = new GeoDate(new Date())

    console.log('clone', date.clone())
    console.log('cloneClass', date.cloneClass())

    console.log('cloneMonthNext', date.cloneMonthNext().getDate())
    console.log('cloneMonthPrevious', date.cloneMonthPrevious().getDate())
    console.log('cloneMonthStart', date.cloneMonthStart().getDate())
    console.log('cloneMonthEnd', date.cloneMonthEnd().getDate())

    console.log('cloneWeekdayStart', date.cloneWeekdayStart().getDate())
    console.log('cloneWeekdayEnd', date.cloneWeekdayEnd().getDate())
    console.log('cloneWeekdayNext', date.cloneWeekdayNext().getDate())
    console.log('cloneWeekdayPrevious', date.cloneWeekdayPrevious().getDate())
    console.log('cloneWeekdayFirst', date.cloneWeekdayFirst().getDate())
    console.log('cloneWeekdayLast', date.cloneWeekdayLast().getDate())

    console.log('cloneDayNext', date.cloneDayNext().getDate())
    console.log('cloneDayPrevious', date.cloneDayPrevious().getDate())
    console.log('cloneDayStart', date.cloneDayStart().getDate())
    console.log('cloneDayEnd', date.cloneDayEnd().getDate())

    date.setType('datetime')

    console.log('getType', date.getType())
    console.log('getMaxDay', date.getMaxDay().value)
    console.log('getFirstDayCode', date.getFirstDayCode().value)
    console.log('getHoursType', date.getHoursType().value)
    console.log('getHour24', date.getHour24())
    console.log('getTimeZoneOffset', date.getTimeZoneOffset().value)
    console.log('getTimeZone', date.getTimeZone().value)

    console.log('getYear', date.getYear())
    console.log('getMonth', date.getMonth())
    console.log('getDay', date.getDay())
    console.log('getHour', date.getHour())
    console.log('getMinute', date.getMinute())
    console.log('getSecond', date.getSecond())

    console.log('standard', date.standard(true).value)
    console.log('standard', date.standard(false).value)

    console.log('locale', date.locale().value)
    console.log('localeYear', date.localeYear().value)
    console.log('localeMonth', date.localeMonth().value)
    console.log('localeDay', date.localeDay().value)
    console.log('localeHour', date.localeHour().value)
    console.log('localeMinute', date.localeMinute().value)
    console.log('localeSecond', date.localeSecond().value)

    console.log('moveByYear', date.moveByYear(1).getDate())
    console.log('moveByMonth', date.moveByMonth(1).getDate())
    console.log('moveByDay', date.moveByDay(1).getDate())
    console.log('moveByHour', date.moveByHour(1).getDate())
    console.log('moveByMinute', date.moveByMinute(1).getDate())
    console.log('moveBySecond', date.moveBySecond(1).getDate())

    return {
      value: date.locale(),
      onClick () {
        date.moveByMonth(1)
      }
    }
  }
})
</script>

<style/>
