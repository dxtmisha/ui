<template>
  <div
    ref="element"
    :class="classes.main"
  >
    <div :class="classes.body" @click="onClick">
      <slot
        :id="id"
        :class-hidden="classes.hidden"
        :classes="classes.input"
      />

      <div :class="classes.label">
        <div :class="classes.title">
          <label :class="classes.text">
            {{ text }}<span v-if="required" :class="classes.required"/>
          </label>
        </div>
      </div>

      <div :class="classes.scoreboard">
        <div ref="leftElement" :class="classes.scoreboardContext">
          <md2-icon v-if="icon" v-bind="iconBind"/>
          <slot :id="id" :update="update" name="left"/>
        </div>
        <div v-if="ifPrefix" ref="prefixElement" :class="classes.prefix">
          {{ prefix }}
          <slot :id="id" :update="update" name="prefix"/>
        </div>
        <div :class="classes.scoreboardSpace"/>
        <div v-if="ifSuffix" ref="suffixElement" :class="classes.suffix">
          <slot :id="id" :update="update" name="suffix"/>
          {{ suffix }}
        </div>
        <div ref="rightElement" :class="classes.scoreboardContext">
          <slot :id="id" :update="update" name="right"/>
          <md2-icon v-if="iconTrailing" v-bind="iconTrailingBind"/>
        </div>
      </div>

      <div :class="classes.border"/>
    </div>
  </div>
</template>

<script lang="ts">
import { FieldComponent } from './FieldComponent'
import { props } from './props'
import Md2Icon from '../Md2Icon/index.vue'

export default {
  name: 'Md2Field',
  components: { Md2Icon },
  props,
  emits: FieldComponent.emits,
  setup (props: object, context: object) {
    return new FieldComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/Field/style';

@include initField(
    'md2',
    v-bind(left),
    v-bind(right),
    v-bind(prefixWidth),
    v-bind(suffixWidth)
);
</style>
