<template>
  <component
    :is="tag"
    :class="classes.main"
    :style="styles.main"
    @click="onClick"
  >
    <md2-progress v-if="progress" v-bind="progressBind"/>

    <md2-icon v-if="thumbnail" v-bind="thumbnailBind"/>
    <md2-icon v-else-if="icon" v-bind="iconBind"/>
    <md2-checkbox v-else-if="isCheckbox" :class="classes.checkbox" v-bind="checkboxBind"/>

    <div v-if="isText" :class="classes.body">
      <md2-icon v-if="iconTrailing" v-bind="iconTrailingBind"/>
      <div :class="classes.text">
        <template v-if="isFullText">
          <div :class="classes.title">
            <span v-if="prefix" :class="classes.prefix">{{ prefix }}</span>
            <span :class="classes.context" v-html="textBind"/>
            <span v-if="suffix" :class="classes.suffix">{{ suffix }}</span>
          </div>
          <div v-if="description" :class="classes.description" v-html="description"/>
        </template>
        <template v-else-if="text">{{ text }}</template>
        <slot/>
      </div>
    </div>
    <div v-if="textShort" :class="classes.short">{{ textShort }}</div>
    <slot/>

    <md2-ripple v-if="isRipple" :inverse="isInverse"/>
  </component>
</template>

<script lang="ts">
import { ListItemComponent } from './ListItemComponent'
import { props } from './props'
import Md2Icon from '../Md2Icon/index.vue'
import Md2Progress from '../Md2Progress/index.vue'
import Md2Ripple from '../Md2Ripple/index.vue'
import Md2Checkbox from '../Md2Checkbox/index.vue'

export default {
  name: 'Md2ListItem',
  components: {
    Md2Checkbox,
    Md2Icon,
    Md2Progress,
    Md2Ripple
  },
  props,
  emits: ListItemComponent.emits,
  setup (props: object, context: object) {
    return new ListItemComponent(props, context).setup()
  }
}
</script>

<style lang="scss">
@import '../../constructors/ListItem/style';

@include initListItem('md2') {
  @include mixinListItemAppearanceContained;
  @include mixinListItemAppearanceContainedSelected;
}
</style>
