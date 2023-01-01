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
        :update="update"
      />

      <div :class="classes.label">
        <div :class="classes.title">
          <label :class="classes.text">
            {{ text }}<span v-if="ifRequired" :class="classes.required"/>
          </label>
        </div>
      </div>

      <div :class="classes.scoreboard">
        <div ref="leftElement" :class="classes.scoreboardContext">
          <template v-if="arrow">
            <md2-icon v-if="align !== 'right'" v-bind="iconPreviousBind">
              <md2-ripple v-if="ifRipple && !disabledPrevious"/>
            </md2-icon>
            <md2-icon v-if="align === 'left'" v-bind="iconNextBind">
              <md2-ripple v-if="ifRipple && !disabledNext"/>
            </md2-icon>
          </template>
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
          <md2-icon v-if="ifCancel" v-bind="iconCancelBind">
            <md2-ripple v-if="ifRipple"/>
          </md2-icon>
          <md2-icon v-if="iconTrailing" v-bind="iconTrailingBind"/>
          <template v-if="arrow">
            <md2-icon v-if="align === 'right'" v-bind="iconPreviousBind">
              <md2-ripple v-if="ifRipple && !disabledPrevious"/>
            </md2-icon>
            <md2-icon v-if="align !== 'left'" v-bind="iconNextBind">
              <md2-ripple v-if="ifRipple && !disabledNext"/>
            </md2-icon>
          </template>
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
import Md2Ripple from '../Md2Ripple/index.vue'

export default {
  name: 'Md2Field',
  components: {
    Md2Icon,
    Md2Ripple
  },
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
