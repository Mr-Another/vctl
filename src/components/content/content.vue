<template>
  <div :class="classes">
    <slot></slot>
  </div>
</template>
<script>
const prefixCls = 'blue-layout-content';

export default {
  name: 'blueContent',
  computed: {
    classes() {
      let classList = [`${prefixCls}`];
      return classList;
    }
  }
};
</script>
