<template>
  <div class="blue-collapse-item" :class="{'blue-collapse-item-active': isActive}">
    <div class="blue-collapse-item-header" @click="toggle">
      <span class=""></span>
      <i class="blue-collapse-item-expand icon-right"></i>
      <slot name="title">{{title}}</slot>
    </div>
    <CollapseTransition>
      <div class="blue-collapse-item-content" v-show="isActive">
        <div class="blue-collapse-item-content-box">
          <slot></slot>
        </div>
      </div>
    </CollapseTransition>
  </div>
</template>
<script>

import CollapseTransition from './collapsetransition';

export default {
  name: 'blueCollapseItem',
  props: {
    name: {
      type: [String, Number]
    },
    title: {
      type: String
    }
  },
  components: {
    CollapseTransition
  },
  data() {
    return {
      isActive: false
    };
  },
  inject: ['collapse'],
  computed: {
  },
  created() {

  },
  methods: {
    toggle() {
      this.collapse.toggle(this.name || this.index);
    }
  }
};
</script>
