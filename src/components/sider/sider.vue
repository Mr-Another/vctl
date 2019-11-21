<template>
  <div :class="classes" :style="styles">
    <slot></slot>
  </div>
</template>
<script>

const prefixCls = 'blue-layout-sider';

export default {
  name: 'blueSider',
  props: {
    theme: String
  },
  computed: {
    classes() {
      return {
        [`${prefixCls}`]: true,
        [`${prefixCls}-theme-${this.theme}`]: this.theme
      };
    },
    styles() {
      let style = {
      };
      return style;
    }
  },
  beforeDestroyed() {
    if (this.$parent && this.$parent.updateSider) {
      this.$parent.updateSider();
    }
  }
};
</script>
