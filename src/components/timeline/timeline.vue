<template>
  <ul :class="classes">
    <slot></slot>
  </ul>
</template>
<script>
const prefixCls = 'blue-timeline';
export default {
  name: 'blueTimeLine',
  props: {
    pending: {
      default: false
    },
    time: {
      default: false
    },
    timeWidth: {
      default: 100
    }
  },
  computed: {
    classes() {
      return [
        `${prefixCls}`, {
          [`${prefixCls}-pending`]: this.pending,
          [`${prefixCls}-time`]: this.time
        }
      ];
    }
  }
};
</script>
