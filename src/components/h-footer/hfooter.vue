<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = 'blue-layout-footer';

export default {
  name: 'blueFooter',
  props: {
  },
  computed: {
    classes() {
      let classList = [`${prefixCls}`];
      return classList;
    }
  }
};
</script>
