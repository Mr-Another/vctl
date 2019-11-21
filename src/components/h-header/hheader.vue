<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = 'blue-layout-header';

export default {
  name: 'blueHeader',
  props: {
    theme: String
  },
  computed: {
    classes() {
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}-theme-${this.theme}`]: this.theme
      };
    }
  }
};
</script>
